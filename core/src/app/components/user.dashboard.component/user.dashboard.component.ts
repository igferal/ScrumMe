import { BoardService } from './../../services/database/board.service';
import { BoardComponent } from './../board.component/board.component';
import { Board } from './../../model/board';
import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { DestroySubscribers } from '../../util/unsuscribe.decorator';


@Component({
    selector: 'dashboard',
    templateUrl: './user.dashboard.component.html',
    styleUrls: ['./user.dashboard.component.css'],
    providers: [BoardService]
})
@DestroySubscribers()
export class UserDashboardComponent implements OnInit, OnDestroy {


    private createBoard: string;
    private boards: Board[];
    public subscribers: any = {};
    private viewContainerRef: ViewContainerRef;
    private showModal: boolean;


    constructor(private boardService: BoardService, private router: Router, viewContainerRef: ViewContainerRef) {

        this.createBoard = 'Añadir tablero';
        this.viewContainerRef = viewContainerRef;

    }


    /**
     * Metodo que nos redirige al tablero que seleccionamos
     */
    public goToBoard(boardId: string) {

        this.router.navigate(['/board', boardId]);

    }

    private showDialog() {
        this.showModal = true;
    }

    private closeDialog() {
        this.showModal = false;
    }


    /**
     * Metodo que nos borra un tablero del cual se es dueño
     */
    private deleteBoard(key: string) {

        this.boardService.deleteBoard(key);

    }

    /**
     * Metodo que cancela una colaboración en un tablero
     */
    private stopColaboration(key: string) {

        this.boardService.deleteColaboration(key);
    }



    /**
     * Metodo que se inicia al crear el componente y obtiene nuestro usuario actual y los tableros 
     * en los que esta colaborando o de los que es dueño, se realiza una suscripcion para ello
     */
    ngOnInit() {

        // this.firebaseService.add();
        this.subscribers.subscription = this.boardService.getUser_Boards().subscribe(
            (boards) => this.boards = boards
        );

    }

    /**
     * Metodo que se ejecuta al destruir el componente y nos des-suscribe de los observers correspondientes
     */
    ngOnDestroy() {

    }


}