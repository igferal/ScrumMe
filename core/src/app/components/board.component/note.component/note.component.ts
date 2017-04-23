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
    @Output() notify = new EventEmitter<string>();
    @Output() addWork = new EventEmitter<any>();
    @Output() changeTaskState = new EventEmitter<any>();
    @Output() createIssue = new EventEmitter<any>();
    @Output() update = new EventEmitter<any>();
    public options: any[];
    public showLogWork: boolean;
    public percentage: number;
    public showInfo: boolean;

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
                    this.showInfoDialog();
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


    public showInfoDialog() {
        this.showInfo = true;
    }


    public closeInfoDialog() {
        this.showInfo = false;
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

        this.notify.emit(this.noteKey);

    }



    public onUpdate(note: PostIt) {

        this.closeInfoDialog();
        note.key = this.noteKey;
        console.log(note);
        this.update.emit(note);
    }

    public onGit(aotFix : any) {
        this.sentToGitHub();
        this.closeInfoDialog();

    }

    public onClose(aotFix : any) {
        this.closeInfoDialog();
        this.closeTask();

    }

    public onDelete(aotFix : any) {

        this.closeInfoDialog();
        this.deleteItem();

    }

    public onLoad(aotFix : any) {

        this.closeInfoDialog();
        this.showLogWorkDialog();

    }


    ngOnInit() {

        this.loadMenu();
        this.percentage = Math.round(100 * (this.note.workedHours / this.note.horas));
    }
}
