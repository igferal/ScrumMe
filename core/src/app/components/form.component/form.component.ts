import { Component } from '@angular/core';
import { PostIt } from '../../model/post.it';
import { FirebaseService } from '../../services/database/firebase.service';


@Component({
    selector: 'createTask',
    templateUrl: './form.component.html',
    providers: [FirebaseService]

})


export class FormComponent {



    constructor(private firebaseService: FirebaseService) { }

    addItem(contenido: string, programador: string, horas: number) {
        var postIt = new PostIt(contenido, programador, horas);
        this.firebaseService.save(postIt, "/todo");

    }

   

}

// 2000 1 200 200 0 0.02