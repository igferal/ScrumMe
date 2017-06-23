import { PostIt } from './../../../model/post.it';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
    selector: 'note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss']

})
export class NoteComponent implements OnInit {

    @Input() note: PostIt;
    @Input() board: any;
    @Input() colKey: any;
    @Input() noteKey: string;
    @Output() notify = new EventEmitter<any>();
    @Output() addWork = new EventEmitter<any>();
    @Output() changeTaskState = new EventEmitter<any>();
    @Output() createIssue = new EventEmitter<any>();
    @Output() update = new EventEmitter<any>();
    public options: any[];
    public percentage: number;

    

 


    constructor() {



    }

    public loadMenu() {
        let label = this.getCloseLabel();
        this.options = [
            {
                label: 'Editar', icon: 'fa fa-pencil-square-o', command: () => {
                   this.note.key = this.noteKey;
                   this.update.emit(this.note);
                }
            },
            {
                label: 'Borrar', icon: 'fa-close', command: () => {
                    this.deleteItem();
                }
            },
            {
                label: 'Cargar horas', icon: 'fa fa-hourglass-o', command: () => {
                     this.note.key = this.noteKey;
                     this.addWork.emit(this.note);
      
                }
            },
            {
                label: label, icon: 'fa fa-calendar-o', command: () => {

                    this.closeTask();
                }
            },
            {
                label: 'Crear issueGitHub', icon: 'fa fa-github', command: () => {

                    this.sentToGitHub();
                }
            }
        ];


    }



    public sentToGitHub() {
        this.createIssue.emit(this.note);
    }

    public closeTask() {

        this.note.key = this.noteKey;
        this.note.closed = !this.note.closed;
        this.changeTaskState.emit(this.note);
    }

    public getCloseLabel(): string {

        if (this.note.closed) {
            return 'Abrir tarea';
        } else {
            return 'Cerrar tarea';
        }

    }


   


    public titleLimited(): string {
        if (this.note.titulo.length > 10) {
            return `${this.note.titulo.substring(0, 10)}...`;
        }
        else {
            return this.note.titulo;
        }

    }

    public contentLimited(): string {
        if (this.note.contenido.length > 80) {
            return `${this.note.contenido.substring(0, 80)}...`;
        }
        else {
            return this.note.contenido;
        }
    }

    public deleteItem() {
        this.note.key = this.noteKey;
        this.notify.emit(this.note);

    }



  

    ngOnInit() {

        this.loadMenu();
        this.percentage = Math.round(100 * (this.note.workedHours / this.note.horas));
    }
}
