import { IColumnService } from './IColumnService';
import { BoardColumn } from './../../model/boardColumn';
import { Board } from './../../model/board';
import { User } from './../../model/user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { PostIt } from '../../model/post.it';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class ColumnService implements IColumnService {

    /**
     * Obtengo el ID del usuario actual del sistema
     */
    constructor(private database: AngularFireDatabase, public auth: AngularFireAuth) {

    }

    /**
    * Me devuelve una coleeccion observable desde firebase
    */
    public getColumns(board: string): FirebaseListObservable<any> {

        return this.database.list(`board_columns/${board}`);

    }


    public saveColumn(boardKey: string, boardCol: BoardColumn) {
        let keyCol;
        keyCol = this.database.list('board_columns' + '/' + boardKey).push(
            new BoardColumn(new Array<PostIt>(), boardCol.columnName)).key;

        boardCol.tasks.forEach((task) => {
            this.database.list("column_tasks/" + boardKey + '/' + keyCol).push(task)

        });




    }

    public deleteColumn(boardKey: string, colKey: string) {

        this.database.list(`column_tasks/${boardKey}/`).remove(colKey);
        this.database.list(`board_columns/${boardKey}/`).remove(colKey);


    }

    public editColumn(key: string, newName: string) {

        this.database.object(key).set(newName);

    }




}
