import { FirebaseService } from './../../services/database/firebase.service';
import { Board } from './../../model/board';
import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { FirebaseAuthentication } from '../../services/authentication/firebase.authentication'
import { Router } from '@angular/router';


@Component({
    selector: 'dashboard',
    templateUrl: './user.dashboard.component.html',
    styleUrls: ['../app.component/app.component.css'],

    providers: [FirebaseService]
   
})
export class UserDashboardComponent implements OnInit, OnDestroy {


    private createBoard: string;
    private colapse: boolean;
    private boards: Board[];
    private subscription: any;
    private currentUser: string;
    private viewContainerRef: ViewContainerRef;


    constructor(private firebaseService: FirebaseService, private router: Router, viewContainerRef: ViewContainerRef) {

        this.createBoard = "Añadir tablero";
        this.viewContainerRef = viewContainerRef;

    }


    /**
     * Metodo que nos redirige al tablero que seleccionamos
     */
    public goToBoard(boardId: string) {

        this.router.navigate(['/board', boardId]);

    }


    /**
     * Metodo que nos borra un tablero del cual se es dueño
     */
    private deleteBoard(key: string) {

        this.firebaseService.deleteBoard(key);

    }

    /**
     * Metodo que cancela una colaboración en un tablero
     */
    private stopColaboration(key: string) {

        this.firebaseService.deleteColaboration(key);
    }



    /**
     * Metodo que se inicia al crear el componente y obtiene nuestro usuario actual y los tableros 
     * en los que esta colaborando o de los que es dueño, se realiza una suscripcion para ello
     */
    ngOnInit() {

        this.subscription = this.firebaseService.getUser_Boards().subscribe(
            (boards) => this.boards = boards
        )
        this.currentUser = this.firebaseService.currentUser;

    }

    /**
     * Metodo que se ejecuta al destruit el componente y nos des-suscribe de los observers correspondientes
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();

    }


}