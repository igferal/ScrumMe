import { Component } from '@angular/core';
import { PostIt } from './post.it';
import { FirebaseService } from './database/firebase.service';


@Component({
    selector: 'form',
    templateUrl: './form.component.html',
    providers: [FirebaseService]

})


export class FormComponent  {


    constructor(private firebaseService: FirebaseService) {}  

    addItem(contenido: string, programador: string, horas: number) {
        var postIt = new PostIt("Migrar la bd", "jorge", 3);
                //var postIt = new PostIt(contenido, programador, horas);

        this.firebaseService.save(postIt, "/todo");

    }

}