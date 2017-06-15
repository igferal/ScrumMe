import { ColumnService } from './column.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { BoardColumn } from './../../model/boardColumn';
export interface IColumnService {



    getColumns(name: string): FirebaseListObservable<any>

    saveColumn(boardKey: string, boardCol: BoardColumn);

    deleteColumn(boardKey: string, colKey: string)

    editColumn(key: String, newName: string);



}