import { Component, OnInit } from '@angular/core';
import { PostIt } from './post.it';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { DragulaModule, DragulaService } from '../../node_modules/ng2-dragula/ng2-dragula';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./app.component.css']
})


export class ListComponent implements OnInit {

    title: string;


    items: FirebaseListObservable<any>;
    cosos: FirebaseListObservable<any>;

    array1: String[];
    array2: String[];



    constructor(private af: AngularFire, private dragulaService: DragulaService) {

    }


    deleteItem(key: string) {
        this.items.remove(key);
    }

    ngOnInit() {

        this.items = this.af.database.list('/todo');
        this.title = "Lista de tareas";
        this.cosos = this.af.database.list('/inprogress');
        this.array1 = ["a", "b", "c"];
        this.array2 = [ "1", "2"];


    }

}