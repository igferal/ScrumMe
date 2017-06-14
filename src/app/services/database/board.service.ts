import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { PostIt } from './../../model/post.it';
import { BoardColumn } from './../../model/boardColumn';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { IBoardService } from './IBoardService';
import { Board } from './../../model/board';
import { AngularFireAuth } from 'angularfire2/auth';



@Injectable()
export class BoardService implements IBoardService {






    /**
     * Obtengo el ID del usuario actual del sistema
     */
    constructor(private database: AngularFireDatabase, public auth: AngularFireAuth) {

    }


    public getBoardInfo(boardId : string) : FirebaseObjectObservable<any>{

            return this.database.object(`user_board/${this.auth.auth.currentUser.uid}/${boardId}`);
    }



        /**
     * Metodo que nos crea un tablero en firebase 
     * Inserta el tablero en la coleccion de tableros
     * Inserta la informacion de cada tablero en el usuario que se le indica en la coleccion
     * user_board, que actua como tabla de realacion 1-n
     * 
     */
    public saveBoard(board: Board) {
        board.owner = this.auth.auth.currentUser.uid;


        let boardInfo = this.transformToBaordInfo(board);

        let keyCol;


        let ref = this.database.list(`user_board/${this.auth.auth.currentUser.uid}`).push(boardInfo).key;

        if (board.boardColumns.length > 0) {
            board.boardColumns.forEach((col) => {

                this.saveColumn(ref, col);
            });
        }

    }



    public updateBoardInfo(boardKey: string, board: Board) {

        this.database.list(`user_board/${this.auth.auth.currentUser.uid}`).update(boardKey, board);

    }

    /**
     * Metodo que nos devuelve los tableros en los que participa un usuario
     * Pendiente de refactorizar para usar el metodo quedevuelve colecciones
     */
    public getUserBoards(): FirebaseListObservable<any> {

        return this.database.list(`user_board/${this.auth.auth.currentUser.uid}`, {
            query: {
                orderByChild: 'name',
            }});

    }




    /**
     * Pendiente de refactorización
     */
    public deleteBoard(key: string, boardOwner: string) {


        this.database.list(`user_board/${this.auth.auth.currentUser.uid}`).remove(key);
        if (this.auth.auth.currentUser.uid === boardOwner) {
            this.database.list("column_tasks/").remove(key);
            this.database.list('board_columns').remove(key);
        }

    }



    public inviteToColab(mail: string, board: Board, boardKey: string): Observable<any> {


        return new Observable((observer) => {
            let boardInfo = this.transformToBaordInfo(board);

            this.database.list('users', {
                query: {
                    orderByChild: '_email',
                    equalTo: mail,
                }
            }).subscribe(userToInvite => {
                if (userToInvite.length > 0) {
                    this.database.list(`collabs/${userToInvite[0]._uid}`).push(this.transformBoardToInvite(board, boardKey));
                    observer.next(`Petición de colaboración enviada a ${mail}`)
                    observer.complete();
                }
                else {
                    observer.error(`${mail} no existe o no se encuentra disponible para compartir`);
                }
            });
        },
        );



    }



    private transformBoardToInvite(board: Board, boardKey: string) {

        let boardInfo = {
            name: board.name,
            date: board.date,
            gitHubRepo: board.gitHubRepo,
            travisRepo: board.travisRepo,
            boardOwner: this.auth.auth.currentUser.uid,
            boardOwnerMail: this.auth.auth.currentUser.email,
            boardKey: boardKey
        }

        return boardInfo;

    }



    private transformToBaordInfo(board: Board) {

        let boardInfo = {
            name: board.name,
            date: board.date,
            gitHubRepo: board.gitHubRepo,
            travisRepo: board.travisRepo,
            boardOwner: this.auth.auth.currentUser.uid
        }

        return boardInfo;

    }
    
    private saveColumn(boardKey: string, boardCol: BoardColumn) {
        let keyCol;
        keyCol = this.database.list('board_columns' + '/' + boardKey).push(
            new BoardColumn(new Array<PostIt>(), boardCol.columnName)).key;

        boardCol.tasks.forEach((task) => {
            this.database.list("column_tasks/" + boardKey + '/' + keyCol).push(task)

        });


    }

}