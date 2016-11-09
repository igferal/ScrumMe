import { Component, OnInit } from '@angular/core';
import { PostIt } from './post.it';
import { FirebaseListObservable } from 'angularfire2';
import { DragulaModule, DragulaService } from '../../node_modules/ng2-dragula/ng2-dragula';
import { FirebaseService } from './database/firebase.service';


@Component({
    selector: 'list',
    templateUrl: './board.component.html',
    styleUrls: ['./app.component.css'],
    providers: [FirebaseService]

})
export class BoardComponent implements OnInit {

    title: string;
    items: PostIt[];
    cosos: FirebaseListObservable<any>;


    constructor(private firebaseService: FirebaseService, private dragulaService: DragulaService) {

       
        dragulaService.drag.subscribe((value) => {
            console.log(`drag: ${value[0]}`);
            this.onDrag();
        });
        dragulaService.drop.subscribe((value) => {
            console.log(`drop: ${value[0]}`);
            this.onDrop();
        });
        dragulaService.over.subscribe((value) => {
            console.log(`over: ${value[0]}`);
            this.onOver();
        });
        dragulaService.out.subscribe((value) => {
            console.log(`out: ${value[0]}`);
            this.onOut();
        });
    }

    private onDrag() {
        // do something
    }

    private onDrop() {
        // do something
    }

    private onOver() {
        // do something
    }

    private onOut() {
        // do something
    }


deleteItemToDo(key: string) {
    this.firebaseService.delete(key, "/todo");
}

deleteItemInProgress(key: string) {
    this.firebaseService.delete(key, "/inprogress");
}


ngOnInit() {


 this.firebaseService.getCollection("/todo").forEach(
     (items)=>  this.items=items
    );
    this.title = "Lista de tareas";
    this.cosos = this.firebaseService.getCollection('/inprogress');
}

}