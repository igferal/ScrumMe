import { FirebaseListObservable } from 'angularfire2';
import { BoardColumn } from './../../model/boardColumn';
export interface IColumnService {



    getColumns(name: string): FirebaseListObservable<any>

    saveColumn(boardKey: string, boardCol: BoardColumn);

    deleteColumn(boardKey: string, colKey: string)

    editColumn(key: String, newName: string);


}