import { Component, Output, EventEmitter } from '@angular/core';
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
    @Output() notify = new EventEmitter<boolean>();

    constructor(private firebaseService: FirebaseService, public router: Router) { }



    onSubmit() {

        var postIt = new PostIt(this.contenido, "", 2, " ");
        this.contenido = "";

        this.firebaseService.save(postIt, '/todo');
        this.notify.emit(false);        // this.router.navigate(['/board']);

    }

}

