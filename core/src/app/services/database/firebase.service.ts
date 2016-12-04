import { Board } from './../../model/board';
import { User } from './../../model/user';
import { Injectable } from '@angular/core';
import { Database } from './IDatabase';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders } from 'angularfire2';
import { PostIt } from '../../model/post.it';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class FirebaseService implements Database {


    public currentUser: string;



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
     * Me devuelve una coleeccion observable desde firebase
     */
    public getCollection(name: string): FirebaseListObservable<any> {

        return this.af.database.list(name);

    }

    /**
     * Metodo que guarda una tarea en firebase
     */
    public saveTask(item: PostIt, collection: string) {
        this.af.database.list(collection).push(item);
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
        let key = this.af.database.list("boards/").push(board).key;
        let boardInfo = {
            name: board.name,
            date: board.date,
            boardOwner: this.currentUser
        }
        this.af.database.object(`user_board/${this.currentUser}/${key}`).set(boardInfo);
        this.inicializateBoard(key);


        if (collabs !== undefined) {
            this.addColaborators(collabs, boardInfo, key);
        }

    }




    /**
      * Metodo auxiliar que nos crea tareas vacias en las columnas del tablon para 
      * poder usar una directiva ngFor en el componete del tablero
      */
    private inicializateBoard(boardKey: string) {

        this.incializateBoardColumns(boardKey, '_todo');
        this.incializateBoardColumns(boardKey, '_inprogress');
        this.incializateBoardColumns(boardKey, '_testing');
        this.incializateBoardColumns(boardKey, '_done');
    }


    /**
       * Metodo que crea los objetos asociados a las tareas vacias
       */
    private incializateBoardColumns(boardKey: string, column: string) {

        this.af.database.object(`boards/${boardKey}/${column}/none`).set(new PostIt('none', 'none', 0, 'none'));

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
     * Metodo borrar que deberíamos utilizar para borrar colecciones
     */
    public delete(key: string, collection: string) {

        this.af.database.list(collection).remove(key);

    }

    /**
     * Pendiente de refactorización
     */
    public deleteBoard(key: string) {


        this.af.database.list('boards').remove(key)
        this.af.database.list(`user_board/${this.currentUser}`).remove(key);

    }



    /**
     * Metodo que nos crea usuarios, pendiente de refactorización
     */
    public createUser(user: User) {

        this.af.database.object(`/users/${user.uid}`).set(user);

    }

    /**
     * Metodo que nos gestiona el cambio de tarea por parte de cada tablero
     */
    public addToOtherBag(board: string, postItId: string, fromCollection: string, toCollection: string, programmer: string): void {

        let postit = this.findById(board, postItId, fromCollection);
        this.addProgrammerLabel(postit, toCollection, programmer);
        this.delete(postItId, `boards/${board}${fromCollection}`);
        this.saveTask(postit, `boards/${board}${toCollection}`);

    }

    /**
     * Metodo que nos encuentra una tarea specifica a traves de su ID 
     * Pendiente de refactorización
     */
    public findById(board: string, key: string, collection: string) {

        let element: any;
        let subscription: any;

        subscription = this.af.database.object(`boards/${board}${collection}/${key}`).subscribe((item) => {
            element = item;
            console.log(item);
        });
        subscription.unsubscribe();

        return new PostIt(element._contenido, element._programador, element._horas, element.$key);
    }

    /**
     * Metodo que nos devuelve al usuario actual de la base da datos
     */
    public getCurrentDeveloper(): FirebaseObjectObservable<any> {

        return this.af.database.object(`users/${this.currentUser}`);

    }

    /**
     * Metodo que nos gestiona el progrmador que utiliza trabaja tarea en cada momento
     */
    private addProgrammerLabel(postIt: PostIt, toCollection: string, programmer: string) {

        if (toCollection !== '/_todo') {
            postIt.progamador = programmer;
        }  else {
            postIt.progamador = '';
        }
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
