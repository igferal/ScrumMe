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
    todos: PostIt[];
    cosos: FirebaseListObservable<any>;


    constructor(private firebaseService: FirebaseService, private dragulaService: DragulaService) {

        dragulaService.drag.subscribe((value) => {

            this.onDrag(value.slice(1));
        });
        dragulaService.drop.subscribe((value) => {
            this.onDrop(value.slice(1));
        });

        dragulaService.over.subscribe((value) => {

            this.onOver(value.slice(1));
        });
        dragulaService.out.subscribe((value) => {

            this.onOut(value.slice(1));
        });


    }

    private onDrag(args) {
        let [e, el] = args;


    }

    private onDrop(args) {
        let [e, el] = args;
        var postItId: string = args[0].id;
        var postit = this.firebaseService.findById(postItId, "/todo");
        this.deleteItemToDo(postItId);
        this.firebaseService.save(postit,"/inprogress")

    }

    private onOver(args) {
        let [e, el, container] = args;

    }

    private onOut(args) {
        let [e, el, container] = args;

    }



    public deleteItemToDo(key: string) {
        this.firebaseService.delete(key, "/todo");
    }

    public deleteItemInProgress(key: string) {
        this.firebaseService.delete(key, "/inprogress");
    }


    public ngOnInit() {


        this.firebaseService.getCollection("/todo").subscribe(
            (items) => this.todos = items
        );





        this.title = "Lista de tareas";
        this.cosos = this.firebaseService.getCollection('/inprogress');
    }

}