import { Component } from '@angular/core';
import { PostIt } from '../../model/post.it';
import { FirebaseService } from '../../services/database/firebase.service';
import { Router } from '@angular/router';


@Component({
    moduleId: 'createTask',
    selector: 'createTask',
    templateUrl: './create.task.component.html',
    providers: [FirebaseService]

})


export class CreateTaskComponent {


    contenido: string;
    programador: string;
    horas: number;

    constructor(private firebaseService: FirebaseService, public router: Router) { }


    onSubmit() {

        var postIt = new PostIt(this.contenido, this.programador, this.horas);
        this.firebaseService.save(postIt,'/todo');
        this.router.navigate(['/board']);

    }

}

