import { Subject } from 'rxjs/Rx';
import { PostIt } from './../../model/post.it';
import { BoardColumn } from './../../model/boardColumn';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { IBoardService } from './IBoardService';
import { Board } from './../../model/board';



@Injectable()
export class BoardService implements IBoardService {

    private currentUser: string;

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

    /**
 * Metodo que nos crea un tablero en firebase 
 * Inserta el tablero en la coleccion de tableros
 * Inserta la informacion de cada tablero en el usuario que se le indica en la coleccion
 * user_board, que actua como tabla de realacion 1-n
 * 
 */
    public saveBoard(board: Board, collabs: string[]) {
        board.owner = this.currentUser;



        let boardInfo = {
            name: board.name,
            date: board.date,
            boardOwner: this.currentUser
        }


        let keyCol;


        let ref = this.af.database.list('boards/').push(boardInfo).key;

        if (board.boardColumns.length > 0) {
            board.boardColumns.forEach((col) => {

                this.saveColumn(ref, col);
            });
        }

        this.af.database.object(`user_board/${this.currentUser}/${ref}`).set(boardInfo);


        if (collabs !== undefined) {
            this.addColaborators(collabs, boardInfo, ref);
        }

    }


    public saveColumn(boardKey: string, boardCol: BoardColumn) {
        let keyCol;
        console.log(boardCol);
        keyCol = this.af.database.list('board_columns' + '/' + boardKey).push(
            new BoardColumn(new Array<PostIt>(), boardCol.columnName)).key;

        boardCol.tasks.forEach((task) => {
            this.af.database.list("column_tasks/" + boardKey + '/' + keyCol).push(task)

        });


    }




    /**
     * Metodo que nos devuelve los tableros en los que participa un usuario
     * Pendiente de refactorizar para usar el metodo quedevuelve colecciones
     */
    public getUser_Boards(): FirebaseListObservable<any> {

        return this.af.database.list(`user_board/${this.currentUser}`);

    }

    /**
     * Metodo que nos detiene una colaboracion
     * Pendiente de refactor también
     */
    public deleteColaboration(key: string) {

        this.af.database.list(`user_board/${this.currentUser}`).remove(key);
    }


    /**
     * Pendiente de refactorización
     */
    public deleteBoard(key: string) {


        this.af.database.list('boards').remove(key)
        this.af.database.list(`user_board/${this.currentUser}`).remove(key);
        this.af.database.list("column_tasks/").remove(key);
        this.af.database.list('board_columns').remove(key);

    }

    /**
 * Metodo que inserta un nuevo colaborador 
 */
    private addColaborator(uid: string, boardInfo: any, key: string) {

        this.af.database.object(`user_board/${uid}/${key}`).set(boardInfo);

    }



    /**
     * Metodo que gestiona la inserción de los colaboradores que le pasamos
     */
    private addColaborators(email: string[], boardInfo: any, boardKey: string) {
        let suscription;
        let subject = new Subject();



        suscription = this.af.database.list('users', {
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

}