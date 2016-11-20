import { Board } from './../../model/board';
import { User } from './../../model/user';
import { Injectable } from '@angular/core';
import { Database } from './IDatabase';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { PostIt } from '../../model/post.it';


@Injectable()
export class FirebaseService implements Database {


    private currentUser: string;


    constructor(private af: AngularFire) {
        this.af.auth.subscribe((user) => {
            if (user != null) {
                this.currentUser = user.uid;
            }
        });
    }

    public getCollection(name: string): FirebaseListObservable<any> {

        return this.af.database.list(name);

    }

    public saveTask(item: PostIt, collection: string) {
        console.log(collection);
        this.af.database.list(collection).push(item);
    }

    public saveBoard(board: Board) {
        console.log(board.todo.length);
        let key = this.af.database.list("boards/").push(board).key;
        let boardInfo = {
            name: board.name,
            date: board.date
        }
        this.af.database.object(`user_board/${this.currentUser}/${key}`).set(boardInfo);
        this.inicializateBoard(key);
    }


    public getUser_Boards(): FirebaseListObservable<any> {

        return this.af.database.list(`user_board/${this.currentUser}`);

    }


    private inicializateBoard(boardKey: string) {

        this.incializateBoardColumns(boardKey, "_todo");
        this.incializateBoardColumns(boardKey, "_inprogress");
        this.incializateBoardColumns(boardKey, "_testing");
        this.incializateBoardColumns(boardKey, "_done");
    }


    private incializateBoardColumns(boardKey: string, column: string) {

        this.af.database.object(`boards/${boardKey}/${column}/none`).set(new PostIt("none", "none", 0, "none"));

    }



    public delete(key: string, collection: string) {

        this.af.database.list(collection).remove(key);

    }



    public findById(board: string, key: string, collection: string) {

        var element: any;

        this.af.database.object(`boards/${board}/${collection}/${key}`).subscribe((item) => {
            element = item;
        });

        return new PostIt(element._contenido, element._programador, element._horas, element.$key);
    }

    public createUser(user: User) {

        this.af.database.object(`/users/${user.uid}`).set(user);

    }

    public addToOtherBag(board: string, postItId: string, fromCollection: string, toCollection: string, programmer: string): void {

        var postit = this.findById(board, postItId, fromCollection);
        this.addProgrammerLabel(postit, toCollection, programmer);
        this.delete(postItId, `boards/${board}${fromCollection}`);
        this.saveTask(postit, `boards/${board}${toCollection}`);

    }

    public getCurrentDeveloper(): FirebaseObjectObservable<any> {

        return this.af.database.object(`users/${this.currentUser}`);

    }

    private addProgrammerLabel(postIt: PostIt, toCollection: string, programmer: string) {

        if (toCollection != '/_todo') {
            postIt.progamador = programmer;
        }
        else {
            postIt.progamador = "";
        }
    }


}
