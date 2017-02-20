import { PostIt } from './../../../model/post.it';
import { FirebaseService } from './../../../services/database/firebase.service';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    moduleId: 'createTask',
    selector: 'createTask',
    templateUrl: './create.task.component.html',
    styleUrls: ['./create.task.component.css'],
    providers: [FirebaseService]

})


export class CreateTaskComponent implements OnInit {


    private contenido: string;
    private horas: number;
    @Input() board: any;
    @Input() colKey: any;
    @Output() notify = new EventEmitter<boolean>();
    private incorrect: boolean;
    @Input() editing;
    private action: string;

    constructor(private firebaseService: FirebaseService, public router: Router) {
        this.horas = 0;
    }


    /**
     * Metodo que nos inserta un nuevo postIt en la base de datos, además notifica al 
     * tablero de que la tarea ha sido creada
     */
    public onSubmit() {

        (this.editing) ? this.edit() : this.save();


    }

    public edit(){
 if (this.isDataCorrrect()) {
            this.incorrect = false;
            let postIt = new PostIt(this.contenido, '', this.horas, '');
            this.contenido = '';
            this.firebaseService.editTask(postIt, `column_tasks/${this.board}/${this.colKey}`);
            this.notify.emit(false);
        } else {
            this.incorrect = true;
            this.horas = 0;
        }
    

    }

    public save() {
        if (this.isDataCorrrect()) {
            this.incorrect = false;
            let postIt = new PostIt(this.contenido, '', this.horas, '');
            this.contenido = '';
            this.firebaseService.saveTask(postIt, `column_tasks/${this.board}/${this.colKey}`);
            this.notify.emit(false);
        } else {
            this.incorrect = true;
            this.horas = 0;
        }

    }

    /**
     * Metodo auxiliar de comprobación del formulario
     */
    private isDataCorrrect(): boolean {

        return this.horas >= 0 && this.contenido !== '';
    }

    ngOnInit() {

        if (this.editing) {
            this.action = 'Editar tarea';
        }
        this.action = 'Añadir tarea';

    }
}

