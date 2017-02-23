import { PostIt } from './../../../model/post.it';
import { Router } from '@angular/router';
import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from './../../../services/database/task.service';


@Component({
    moduleId: 'noteContent',
    selector: 'noteContent',
    templateUrl: './note.content.component.html',
    styleUrls: ['./note.content.component.css'],
    providers: [TaskService]

})


export class NoteContent implements OnInit {


    private contenido: string;
    private horasEstimadas: number;
    private currentWorkedHours: number;
    @Input() board: any;
    @Input() colKey: any;
    @Input() note: PostIt;
    @Input() noteKey: string;
    @Output() notify = new EventEmitter<boolean>();

    private incorrect: boolean;

    constructor(private taskService: TaskService, public router: Router) {
    }


    ngOnInit() {


        console.log(this.board);
        console.log(this.colKey);
        console.log(this.note);
        console.log(this.noteKey);
    


    }



}

