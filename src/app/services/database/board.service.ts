import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { PostIt } from './../../model/post.it';
import { BoardColumn } from './../../model/boardColumn';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { IBoardService } from './IBoardService';
import { Board } from './../../model/board';
import { AngularFireAuth } from 'angularfire2/auth';



@Injectable()
export class BoardService implements IBoardService {

    private currentUser: string;
    private currentUserMail: string;
    private subject : Subject<any> = new Subject();






    /**
     * Obtengo el ID del usuario actual del sistema
     */
    constructor(private database: AngularFireDatabase, public auth: AngularFireAuth) {


        this.subject.next("a");

        this.auth.authState.subscribe((user) => {
            if (user != null) {
                this.currentUser = user.uid;
                this.currentUserMail = user.email;
            }
        });


    }


    public filter(filterParams){
        this.subject.next(filterParams)
    }

    /**
 * Metodo que nos crea un tablero en firebase 
 * Inserta el tablero en la coleccion de tableros
 * Inserta la informacion de cada tablero en el usuario que se le indica en la coleccion
 * user_board, que actua como tabla de realacion 1-n
 * 
 */
    public saveBoard(board: Board) {
        board.owner = this.currentUser;

        this.addColaborator

        let boardInfo = this.transformToBaordInfo(board);

        let keyCol;


        let ref = this.database.list(`user_board/${this.currentUser}`).push(boardInfo).key;

        if (board.boardColumns.length > 0) {
            board.boardColumns.forEach((col) => {

                this.saveColumn(ref, col);
            });
        }

    }



    public updateBoardInfo(boardKey: string, board: Board) {

        this.database.list(`user_board/${this.currentUser}`).update(boardKey, board);

    }


    public saveColumn(boardKey: string, boardCol: BoardColumn) {
        let keyCol;
        keyCol = this.database.list('board_columns' + '/' + boardKey).push(
            new BoardColumn(new Array<PostIt>(), boardCol.columnName)).key;

        boardCol.tasks.forEach((task) => {
            this.database.list("column_tasks/" + boardKey + '/' + keyCol).push(task)

        });


    }




    /**
     * Metodo que nos devuelve los tableros en los que participa un usuario
     * Pendiente de refactorizar para usar el metodo quedevuelve colecciones
     */
    public getUser_Boards(): FirebaseListObservable<any> {

        return this.database.list(`user_board/${this.currentUser}`, {
            query: {
                orderByChild: 'name',
            }});

    }

    /**
     * Metodo que nos detiene una colaboracion
     * Pendiente de refactor también
     */
    public deleteColaboration(key: string, boardDeleter: string) {

        this.database.list(`user_board/${this.currentUser}`).remove(key);
    }


    /**
     * Pendiente de refactorización
     */
    public deleteBoard(key: string, boardOwner: string) {


        this.database.list(`user_board/${this.currentUser}`).remove(key);
        if (this.currentUser === boardOwner) {
            this.database.list("column_tasks/").remove(key);
            this.database.list('board_columns').remove(key);
        }

    }

    /**
 * Metodo que inserta un nuevo colaborador 
 */
    private addColaborator(uid: string, boardInfo: any, key: string) {

        this.database.object(`user_board/${uid}/${key}`).set(boardInfo);

    }


    private transformToBaordInfo(board: Board) {

        let boardInfo = {
            name: board.name,
            date: board.date,
            gitHubRepo: board.gitHubRepo,
            travisRepo: board.travisRepo,
            boardOwner: this.currentUser
        }

        return boardInfo;

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
            boardOwner: this.currentUser,
            boardOwnerMail: this.currentUserMail,
            boardKey: boardKey
        }

        return boardInfo;

    }

    public getInvitationsToCollab(): FirebaseListObservable<any> {

        console.log(this.currentUser);
        return this.database.list(`collabs/${this.currentUser}`);

    }

    /**
     * Metodo que gestiona la inserción de los colaboradores que le pasamos
     */
    public addColaborators(email: string[], board: Board, boardKey: string) {
        let suscription;
        let subject = new Subject();
        let boardInfo = this.transformToBaordInfo(board);


        suscription = this.database.list('users', {
            query: {
                orderByChild: '_email',
                equalTo: subject,
            }
        }).subscribe(item => {

            if (item != null) {
                console.log(item);
                this.addColaborator(item[0]._uid, boardInfo, boardKey);
            }
        });


        email.forEach(element => {
            subject.next(element)
        });
        subject.complete();

    }

    public declineCollaboration(collabKey: string) {

        this.database.list(`collabs/${this.currentUser}`).remove(collabKey);

    }

    public acceptColab(collabKey: string, board: any, boardKey: string) {

        this.declineCollaboration(collabKey);


        this.addColaborator(this.currentUser, board, boardKey);

    }

}