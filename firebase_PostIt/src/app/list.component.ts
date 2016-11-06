import { Component, OnInit } from '@angular/core';
import { PostIt } from './post.it';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./app.component.css']
})


export class ListComponent implements OnInit {

    title: string;

    items: FirebaseListObservable<any>;
    constructor(private af: AngularFire) {

    }



    deleteItem(key: string) {
        this.items.remove(key);
    }

    ngOnInit() {

        this.items = this.af.database.list('/items');
        this.title = "Lista de tareas";

    }

}