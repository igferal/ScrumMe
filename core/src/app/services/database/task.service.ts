import { PostIt } from './../../model/post.it';
import { ITaskService } from './ITaskService';
import { BoardColumn } from './../../model/boardColumn';
import { Board } from './../../model/board';
import { User } from './../../model/user';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders } from 'angularfire2';
import { Subject } from 'rxjs/Subject';




@Injectable()
export class TaskService implements ITaskService {
    
    public currentUser: string;

    /**
     * Obtengo el ID del usuario actual del sistema
     */
    constructor(private af: AngularFire) {


        this.af.auth.subscribe((user) => {
            if (user != null) {
                this.currentUser = user.uid;
            }
        });


    }

    getTasks(colKey: string, boardKey: string): FirebaseListObservable<any> {

        return this.af.database.list(`column_tasks/${boardKey}/${colKey}`);
    }



    saveTask(colKey: string, boardKey: string, postIt: PostIt) {

        this.getTasks(colKey, boardKey).push(postIt);
    }


    deleteTask(boardKey: string, colKey: string, taskKey: string) {

        this.getTasks(colKey, boardKey).remove(taskKey);
    }

    editTask(key: String, newTask: PostIt) {

    }

    addToOtherBag(board: string, postItId: string, fromCollection: string,
        toCollection: string, programmer: string): void {


        let postit = this.findTaskById(board, postItId, fromCollection);
        this.addProgrammerLabel(postit, toCollection, programmer);
        this.deleteTask(board, fromCollection, postItId);
        this.saveTask(toCollection, board, postit);
    }


    public findTaskById(board: string, key: string, collection: string) {

        let element: any;
        let subscription: any;
        console.log(`column_tasks/${board}/${collection}/${key}`);
        subscription = this.af.database.object(`column_tasks/${board}/${collection}/${key}`).subscribe((item) => {
            console.log(item);
            element = item;
        });
        subscription.unsubscribe();

        return new PostIt(element._contenido, element._programador, element._horas, element.$key);
    }

    private addProgrammerLabel(postIt: PostIt, toCollection: string, programmer: string) {

        if (toCollection !== '/_todo') {
            postIt.progamador = programmer;
        } else {
            postIt.progamador = '';
        }
    }

}
