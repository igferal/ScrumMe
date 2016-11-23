import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PostIt } from '../../model/post.it';
import { FirebaseService } from '../../services/database/firebase.service';
import { Router } from '@angular/router';


@Component({
    moduleId: 'createTask',
    selector: 'createTask',
    templateUrl: './create.task.component.html',
    styleUrls: ['./create.task.component.css'],
    providers: [FirebaseService]

})


export class CreateTaskComponent {


    private contenido: string;
    private programador: string;
    private horas: number;
    @Input() board: any;
    @Output() notify = new EventEmitter<boolean>();

    constructor(private firebaseService: FirebaseService, public router: Router) { }


    /**
     * Metodo que nos inserta un nuevo postIt en la base de datos, además notifica al 
     * tablero de que la tarea ha sido creada
     */
    public onSubmit() {

        var postIt = new PostIt(this.contenido, "", 2, " ");
        this.contenido = "";

        this.firebaseService.saveTask(postIt, `boards/${this.board}/_todo`);
        this.notify.emit(false);

    }

}

