import { BoardColumn } from './../../model/boardColumn';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PostIt } from '../../model/post.it';
import { FirebaseService } from '../../services/database/firebase.service';
import { Router } from '@angular/router';


@Component({
    moduleId: 'createColumn',
    selector: 'createColumn',
    templateUrl: './create.column.component.html',
    styleUrls: ['./create.column.component.css'],
    providers: [FirebaseService]

})


export class CreateColumnComponent {



    @Input() board: any;
    @Output() notify = new EventEmitter<boolean>();
    private name: string;

    constructor(private firebaseService: FirebaseService, public router: Router) {
    }


    /**
     * Metodo que nos inserta un nuevo postIt en la base de datos, además notifica al 
     * tablero de que la tarea ha sido creada
     */
    public onSubmit() {
        let colBoard = new BoardColumn(new Array<PostIt>(), this.name);
        this.firebaseService.saveColumn(this.board, colBoard);
        this.name = '';
        this.notify.emit(false);

    }


}

