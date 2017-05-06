import { BoardService } from './../../services/database/board.service';
import { BoardComponent } from './../board.component/board.component';
import { Board } from './../../model/board';
import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { DestroySubscribers } from '../../util/unsuscribe.decorator';


@Component({
    selector: 'dashboard',
    templateUrl: './user.dashboard.component.html',
    styleUrls: ['./user.dashboard.component.scss'],
    providers: [BoardService]
})
@DestroySubscribers()
export class UserDashboardComponent implements OnInit, OnDestroy {


    public createBoard: string;
    public boards: Board[];
    public subscribers: any = {};
    public viewContainerRef: ViewContainerRef;
    public showModal: boolean;
    public options: any[];
    public msgs = [];



    constructor(public boardService: BoardService, viewContainerRef: ViewContainerRef) {

        this.createBoard = 'Añadir tablero';
        this.viewContainerRef = viewContainerRef;
    }

    public processMessage(event){
        this.msgs.push(event);
    }

    public showDialog() {
        this.showModal = true;
    }

    public closeDialog() {
        this.showModal = false;
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