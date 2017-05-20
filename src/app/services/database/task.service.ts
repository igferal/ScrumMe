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


    /**
     * Obtengo el ID del usuario actual del sistema
     */
    constructor(private database: AngularFireDatabase, public auth: AngularFireAuth) {
    }



    getTasks(colKey: string, boardKey: string): FirebaseListObservable<any> {

        return this.database.list(`column_tasks/${boardKey}/${colKey}`);
    }

    updateTask(colKey: string, boardKey: string, noteKey: string, postIt: PostIt) {

        this.database.list(`column_tasks/${boardKey}/${colKey}`).update(noteKey, postIt);
        this.database.list(`burndown/${boardKey}/`).update(noteKey, postIt);

    }



    saveTask(colKey: string, boardKey: string, postIt: PostIt) {

        let key = this.getTasks(colKey, boardKey).push(postIt).key;
        console.log(`burndown/${boardKey}/${key}`);
        this.database.object(`burndown/${boardKey}/${key}`).set(postIt);

    }


    deleteTask(boardKey: string, colKey: string, taskKey: string) {

        this.getTasks(colKey, boardKey).remove(taskKey);
        this.database.list(`burndown/${boardKey}`).remove(taskKey);

    }

    editTask(key: String, newTask: PostIt) {

    }

    addToOtherBag(board: string, postItId: string, fromCollection: string,
        toCollection: string, programmer: string): void {

        console.log(programmer);
        let postit = this.findTaskById(board, postItId, fromCollection);

        postit.programador = programmer;

        this.deleteTask(board, fromCollection, postItId);

        this.saveTask(toCollection, board, postit);

    }


    public findTaskById(board: string, key: string, collection: string) {

        let element: any;
        let subscription: any;
        console.log(`column_tasks/${board}/${collection}/${key}`);
        subscription = this.database.object(`column_tasks/${board}/${collection}/${key}`).subscribe((item) => {
            element = item;
        });
        subscription.unsubscribe();

        let note: PostIt = new PostIt(element.titulo, element.contenido, element.programador, element.horas, element.$key);

        note.workedHours = element.workedHours;
        note.uid = this.auth.auth.currentUser.uid;
        return note;
    }

    getTasksOrderedByEstimatedTime(boardKey: string): FirebaseListObservable<any> {

        console.log(`burndown/${boardKey}`);

        return this.database.list(`burndown/${boardKey}`, {
            query: {
                orderByChild: 'horas',
            }
        });

    }

    getMyTask(boardKey: string): FirebaseListObservable<any> {

        console.log(`burndown/${boardKey}`);

        return this.database.list(`burndown/${boardKey}`, {
            query: {
                orderByChild: 'uid',
                equalTo:  this.auth.auth.currentUser.uid
            }
        });

    }








}
