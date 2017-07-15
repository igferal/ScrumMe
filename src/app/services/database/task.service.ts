import { PostIt } from './../../model/post.it';
import { ITaskService } from './ITaskService';
import { BoardColumn } from './../../model/boardColumn';
import { Board } from './../../model/board';
import { User } from './../../model/user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';




@Injectable()
export class TaskService implements ITaskService {


    
    constructor(private database: AngularFireDatabase, public auth: AngularFireAuth) {
    }



    public getTasks(colKey: string, boardKey: string): FirebaseListObservable<any> {

        return this.database.list(`column_tasks/${boardKey}/${colKey}`);
    }

    public updateTask(colKey: string, boardKey: string, noteKey: string, postIt: PostIt) {

        this.database.list(`column_tasks/${boardKey}/${colKey}`).update(noteKey, postIt);
        this.database.list(`burndown/${boardKey}/`).update(noteKey, postIt);

    }



    public saveTask(colKey: string, boardKey: string, postIt: PostIt) {

        let key = this.getTasks(colKey, boardKey).push(postIt).key;
        this.database.object(`burndown/${boardKey}/${key}`).set(postIt);

    }


    public deleteTask(boardKey: string, colKey: string, taskKey: string) {

        this.getTasks(colKey, boardKey).remove(taskKey);
        this.database.list(`burndown/${boardKey}`).remove(taskKey);

    }



    public addToOtherBag(board: string, postItId: string, fromCollection: string,
        toCollection: string, programmer: string): void {

        let postit = this.findTaskById(board, postItId, fromCollection);

        postit.programador = programmer;

        this.deleteTask(board, fromCollection, postItId);

        this.saveTask(toCollection, board, postit);

    }


    public findTaskById(board: string, key: string, collection: string) {

        let element: any;
        let subscription: any;
        subscription = this.database.object(`column_tasks/${board}/${collection}/${key}`).subscribe((item) => {
            element = item;
        });
        subscription.unsubscribe();
        let note: PostIt = new PostIt(element.titulo, element.contenido, element.programador, element.horas, element.$key);
        note.workedHours = element.workedHours;
        note.closed = element.closed;
        note.uid = this.auth.auth.currentUser.uid;
        return note;
    }

    public getTasksOrderedByEstimatedTime(boardKey: string): FirebaseListObservable<any> {

        return this.database.list(`burndown/${boardKey}`, {
            query: {
                orderByChild: 'horas',
            }
        });

    }

    public getMyTasks(boardKey: string): FirebaseListObservable<any> {

        console.log(`burndown/${boardKey}`);

        return this.database.list(`burndown/${boardKey}`, {
            query: {
                orderByChild: 'uid',
                equalTo:  this.auth.auth.currentUser.uid
            }
        });

    }








}
