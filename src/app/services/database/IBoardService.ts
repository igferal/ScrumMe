import { Observable } from 'rxjs/Observable';
import { PostIt } from './../../model/post.it';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Board } from './../../model/board';

export interface IBoardService {



    saveBoard(board: Board);

    deleteBoard(key: string, boardOwnerKey: string);    

    updateBoardInfo(boardKey: string, board: Board);

    getUserBoards(): FirebaseListObservable<any>;

    getBoardInfo(boardId : string) : FirebaseObjectObservable<any>;

    inviteToColab(mail: string, board: Board, boardKey: string): Observable<any>;


}