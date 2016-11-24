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
    private incorrect: boolean;

    constructor(private firebaseService: FirebaseService, public router: Router) {
        this.horas = 0;
    }


    /**
     * Metodo que nos inserta un nuevo postIt en la base de datos, además notifica al 
     * tablero de que la tarea ha sido creada
     */
    public onSubmit() {

        if (this.isDataCorrrect()) {
            this.incorrect = false;
            var postIt = new PostIt(this.contenido, "", this.horas, " ");
            this.contenido = "";
            this.firebaseService.saveTask(postIt, `boards/${this.board}/_todo`);
            this.notify.emit(false);
        }
        else {
            this.incorrect = true;
            this.horas = 0;
        }

    }

    /**
     * Metodo auxiliar de comprobación del formulario
     */
    private isDataCorrrect(): boolean {

        return this.horas >= 0 && this.contenido != "";
    }
}

