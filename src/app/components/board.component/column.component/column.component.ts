import { GithubService } from './../../../services/github/github.service';
import { TaskService } from '../../../services/database/task.service';
import { ColumnService } from './../../../services/database/column.service';
import { DestroySubscribers } from '../../../util/unsuscribe.decorator';
import { PostIt } from './../../../model/post.it';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
    public subscribers: any = {};
    public options: any[];
    public showModal: boolean;
    public showModalCol: boolean;
    public showModalGit: boolean;
    public notesToDispose = [];
    public size: number;


    constructor(private columnService: ColumnService, public taskService: TaskService, public githubService: GithubService) {

        this.notesToDispose.push({});
        this.options = [
            {
                label: 'Editar', icon: 'fa fa-pencil-square-o', command: () => {
                    this.showDialogCol();
                }
            },
            {
                label: 'Borrar', icon: 'fa-close', command: () => {
                    this.delete();
                }
            },
            {
                label: 'Añadir tarea', icon: 'fa fa-plus', command: () => {
                    this.showDialog();
                }
            },
            {
                label: 'Añadir issues', icon: 'fa fa-github', command: () => {
                    this.showDialogGit();
                }
            }

        ];
    }



    /**
    * Metodo que nos gestiona el borrado de notas
    */
    public onNotify(key: string) {
        console.log(key);
        this.taskService.deleteTask(this.boardKey, this.colKey, key);
    }

    public showDialog() {
        this.showModal = true;
    }

    public closeDialog() {
        this.showModal = false;
    }

    public showDialogGit() {
        this.showModalGit = true;
    }

    public closeDialogGit() {
        this.showModalGit = false;
    }


    public showDialogCol() {
        this.showModalCol = true;
    }

    public closeDialogCol() {
        this.showModalCol = false;
    }

    public onLogHours(note: PostIt) {

        this.taskService.updateTask(this.colKey, this.boardKey, note.key, note);

    }

    public onChangeState(note: PostIt) {

        this.taskService.updateTask(this.colKey, this.boardKey, note.key, note);
    }

    public createGitIssue(postit: PostIt) {

        this.githubService.postIssue('AplicacionFifa', 'nacho1014', postit);

    }

    public onUpdate(note: PostIt) {

        this.taskService.updateTask(this.colKey, this.boardKey, note.key, note);


    }

    public delete() {

        this.columnService.deleteColumn(this.boardKey, this.colKey);
    }

    ngOnInit() {

        this.subscribers.subscription = this.taskService.getTasks(this.colKey, this.boardKey).subscribe((items) => {
            this.notes = items;
            console.log(this.colName)
            console.log(` notes: ${this.notes.length}`);
            console.log(` notesToDispose: ${this.notesToDispose.length}`);


            if (this.notes) {
                this.size = this.notes.length;
            } else {
                this.size = 0;
            }
        });

    }


}
