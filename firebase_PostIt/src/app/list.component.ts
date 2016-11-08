import { Component, OnInit } from '@angular/core';
import { PostIt } from './post.it';
import { FirebaseListObservable } from 'angularfire2';
import { DragulaModule, DragulaService } from '../../node_modules/ng2-dragula/ng2-dragula';
import { FirebaseService } from './database/firebase.service';


@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./app.component.css'],
    providers: [FirebaseService]

})
export class ListComponent implements OnInit {

    title: string;
    items: FirebaseListObservable<any>;
    cosos: FirebaseListObservable<any>;


    constructor(private firebaseService: FirebaseService, private dragulaService: DragulaService) {

        dragulaService.setOptions('bag-one', {
            revertOnSpill: true
        });

        dragulaService.setOptions('bag-two', {
            revertOnSpill: true
        });

    }

    deleteItemToDo(key: string) {
        this.firebaseService.delete(key, "/todo");
    }

    deleteItemInProgress(key: string) {
        this.firebaseService.delete(key, "/inprogress");
    }


    ngOnInit() {
        this.items = this.firebaseService.getCollection('/todo');
        this.title = "Lista de tareas";
        this.cosos = this.firebaseService.getCollection('/inprogress');
    }

}