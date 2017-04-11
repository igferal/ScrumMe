import { PostIt } from './../../../model/post.it';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
    selector: 'note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss']

})
export class NoteComponent implements OnInit {

    @Input() note: PostIt;
    @Output() notify = new EventEmitter<string>();
    @Output() addWork = new EventEmitter<any>();
    @Output() changeTaskState = new EventEmitter<any>();
    @Output() createIssue = new EventEmitter<any>();
    @Input() board: any;
    @Input() colKey: any;
    @Input() noteKey: string;
    public options: any[];
    public showLogWork: boolean;
    public percentage: number;

    public showLogWorkDialog() {
        this.showLogWork = true;
    }

    public removeLogWorkDialog() {
        this.showLogWork = false;
    }



    constructor() {



    }

    public loadMenu() {
        let label = this.getCloseLabel();
        this.options = [
            {
                label: 'Editar', icon: 'fa fa-pencil-square-o', command: () => {

                }
            },
            {
                label: 'Borrar', icon: 'fa-close', command: () => {
                    this.deleteItem();
                }
            },
            {
                label: 'Cargar horas', icon: 'fa fa-hourglass-o', command: () => {
                    this.showLogWorkDialog();
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

    public logHours(hours: any) {


        this.note.workedHours = (this.note.workedHours + parseInt(hours));
        this.note.key = this.noteKey;
        this.addWork.emit(this.note);
        this.removeLogWorkDialog();

    }


    public deleteItem() {

        this.notify.emit(this.noteKey);
    }

    ngOnInit() {

        this.loadMenu();
        this.percentage = Math.round(100 * (this.note.workedHours / this.note.horas));
    }
}
