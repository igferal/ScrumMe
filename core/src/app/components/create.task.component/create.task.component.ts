import { TaskService } from './../../services/database/task.service';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PostIt } from '../../model/post.it';
import { Router } from '@angular/router';


@Component({
    moduleId: 'createTask',
    selector: 'createTask',
    templateUrl: './create.task.component.html',
    styleUrls: ['./create.task.component.scss'],
    providers: [TaskService]

})


export class CreateTaskComponent {


    private contenido: string;
    private horas: number;
    private name: string;
    @Input() board: any;
    @Input() colKey: any;
    @Output() notify = new EventEmitter<boolean>();
    @Input() editing: boolean;
    private incorrect: boolean;

    constructor(private taskService: TaskService, public router: Router) {
        this.horas = 0;
    }


    /**
     * Metodo que nos inserta un nuevo postIt en la base de datos, además notifica al 
     * tablero de que la tarea ha sido creada
     */
    public onSubmit() {

        if (this.isDataCorrrect()) {
            this.incorrect = false;
            let postIt = new PostIt(this.name, this.contenido, '', this.horas, '');
            this.contenido = '';
            this.taskService.saveTask(this.colKey, this.board, postIt);
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
}

