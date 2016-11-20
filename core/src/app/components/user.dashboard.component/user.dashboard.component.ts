import { FirebaseService } from './../../services/database/firebase.service';
import { Board } from './../../model/board';
import { Component, OnInit, OnDestroy } from '@angular/core';
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

    constructor(private firebaseService: FirebaseService, private router: Router) {

        this.createBoard = "Añadir tablero";

    }



    public goToBoard(boardId: string) {

        this.router.navigate(['/board', boardId]);

    }


    private colapseEvent(colapse) {

        this.onColapse();

    }



    private onColapse() {
        if (this.colapse) {
            this.createBoard = "Añadir tablero";
            this.colapse = !this.colapse;

        }
        else {
            this.createBoard = "Colapsar";
            this.colapse = !this.colapse;

        }
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();

    }
    ngOnInit() {

        this.subscription = this.firebaseService.getUser_Boards().subscribe(
            (boards) => this.boards = boards
        )

    }


}