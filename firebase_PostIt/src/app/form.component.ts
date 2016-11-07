import { Component, OnInit } from '@angular/core';
import { PostIt } from './post.it';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
    selector: 'form',
    templateUrl: './form.component.html',

})


export class FormComponent implements OnInit {


    items: FirebaseListObservable<any>;
    constructor(private af: AngularFire) {

    }

    ngOnInit() {

        this.items = this.af.database.list('/items');

    }

    addItem(contenido: string, programador: string, horas: number) {

        var postIt = new PostIt(contenido, programador, horas);
        this.items.push(postIt);

    }
    updateItem(key: string, newText: string) {
        this.items.update(key, { text: newText });
    }

    deleteEverything() {
        this.items.remove();
    }
}