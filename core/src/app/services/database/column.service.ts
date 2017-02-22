import { IColumnService } from './IColumnService';
import { BoardColumn } from './../../model/boardColumn';
import { Board } from './../../model/board';
import { User } from './../../model/user';
import { Injectable } from '@angular/core';
import { Database } from './IDatabase';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders } from 'angularfire2';
import { PostIt } from '../../model/post.it';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ColumnService implements IColumnService {


    /**
    * Me devuelve una coleeccion observable desde firebase
    */
    public getColumns(name: string): FirebaseListObservable<any> {

        return this.af.database.list(name);

    }


    public saveColumn(boardKey: string, boardCol: BoardColumn) {
        let keyCol;
        console.log(boardCol);
        keyCol = this.getColumns('board_columns' + '/' + boardKey).push(
            new BoardColumn(new Array<PostIt>(), boardCol.columnName)).key;

        boardCol.tasks.forEach((task) => {
            this.getColumns("column_tasks/" + boardKey + '/' + keyCol).push(task)

        });




    }

    deleteColumn(boardKey: string, colKey: string) {

        this.getColumns(`column_tasks/${boardKey}/`).remove(colKey);
        this.getColumns(`board_columns/${boardKey}/`).remove(colKey);


    }

    editColumn(key: string, newName: string) {

        this.af.database.object(key).set(newName);

    }

    

    public currentUser: string;



    /**
     * Obtengo el ID del usuario actual del sistema
     */
    constructor(private af: AngularFire) {

        console.log('Servicio de Columna');

        this.af.auth.subscribe((user) => {
            if (user != null) {
                this.currentUser = user.uid;
            }
        });


    }





}
