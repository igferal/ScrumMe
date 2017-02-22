import { PostIt } from './../../model/post.it';
import { FirebaseListObservable } from 'angularfire2';
import { Board } from './../../model/board';

export interface IBoardService {


    deleteBoard(key: string);

    deleteColaboration(key: string);

    getUser_Boards(): FirebaseListObservable<any>;

    saveBoard(board: Board, collabs: string[]);

}