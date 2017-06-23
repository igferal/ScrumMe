import { GithubService } from './../../../services/github/github.service';
import { TaskService } from '../../../services/database/task.service';
import { ColumnService } from './../../../services/database/column.service';
import { DestroySubscribers } from '../../../util/unsuscribe.decorator';
import { PostIt } from './../../../model/post.it';
import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
    moduleId: 'column.component',
    selector: 'app-column',
    templateUrl: 'column.component.html',
    styleUrls: ['./column.component.scss'],
    providers: [GithubService]


})
@DestroySubscribers()
export class ColumnComponent implements OnInit {

    public notes: PostIt[];
    @Input() public colKey: string;
    @Input() public colName: string;
    @Input() public boardKey: string;
    @Input() public gitHubRepo: string;
    @Output() public createTask = new EventEmitter<string>();
    @Output() public createTaskFromIssue = new EventEmitter<string>();
    @Output() public editColName = new EventEmitter<any>();
    @Output() public logHoursEmmiter = new EventEmitter<any>();
    public currentNote: PostIt;
    public subscribers: any = {};
    public options: any[];
    public notesToDispose = [];
    public size: number;
    public showInfo: boolean;



    constructor(private columnService: ColumnService, public taskService: TaskService, public githubService: GithubService) {

        this.notesToDispose.push({});
        this.options = [
            {
                label: 'Editar', icon: 'fa fa-pencil-square-o', command: () => {
                    this.editColName.emit({
                        colKey: this.colKey,
                        colName: this.colName
                    })
                }
            },
            {
                label: 'Borrar', icon: 'fa-close', command: () => {
                    this.delete();
                }
            },
            {
                label: 'Añadir tarea', icon: 'fa fa-plus', command: () => {
                    this.createTask.emit(this.colKey);
                }
            },
            {
                label: 'Añadir issues', icon: 'fa fa-github', command: () => {
                    if (this.gitHubRepo) {
                        this.createTaskFromIssue.emit(this.colKey);
                    }
                }
            }

        ];
    }




    /**
    * Metodo que nos gestiona el borrado de notas
    */
    public onDeleteTask(note: PostIt) {

        this.currentNote = note;
        this.taskService.deleteTask(this.boardKey, this.colKey, this.currentNote.key);
        this.inicializateCurrentNote();
    }


    public showInfoDialog() {
        this.showInfo = true;
    }


    public closeInfoDialog() {
        this.showInfo = false;
    }






    public onLogHours(note: PostIt) {

        this.currentNote = note;
        this.logHours();

    }

    public onChangeState(note: PostIt) {

        this.taskService.updateTask(this.colKey, this.boardKey, note.key, note);
    }

    public createGitIssue(postit: PostIt) {

        this.currentNote = postit;
        if (this.gitHubRepo) {
            this.githubService.postIssue(this.gitHubRepo, this.currentNote);
        }
    }

    public onUpdate(note: PostIt) {

        this.currentNote = note;
        this.showInfoDialog();


    }


    public update() {

        this.taskService.updateTask(this.colKey, this.boardKey, this.currentNote.key, this.currentNote);

    }

    public delete() {

        this.columnService.deleteColumn(this.boardKey, this.colKey);
    }

    public logHours() {

        this.logHoursEmmiter.emit({
            note : this.currentNote,
            colKey : this.colKey}
        );


    }


    public onUpdateInfo(note: PostIt) {

        this.update();
        this.closeInfoDialog();

    }

    public onGit(aotFix: any) {

        this.createGitIssue(this.currentNote);
        this.closeInfoDialog();


    }

    public onClose(aotFix: any) {
        this.closeInfoDialog();
        this.currentNote.closed = !this.currentNote.closed;
        this.update();
        this.closeInfoDialog();

    }

    public onDelete(aotFix: any) {

        this.closeInfoDialog();
        this.onDeleteTask(this.currentNote);
        this.closeInfoDialog();

    }

    public onLoad(aotFix: any) {

        this.closeInfoDialog();
        this.logHours();

    }





    public inicializateCurrentNote() {


        this.currentNote = new PostIt("", ",", "", 0, "");
        this.currentNote.workedHours = 0;


    }

    ngOnInit() {

        this.inicializateCurrentNote();
        this.subscribers.subscription = this.taskService.getTasks(this.colKey, this.boardKey).subscribe((items) => {
            this.notes = items;
            if (this.notes) {
                this.size = this.notes.length;
            } else {
                this.size = 0;
            }
        });

    }


}
