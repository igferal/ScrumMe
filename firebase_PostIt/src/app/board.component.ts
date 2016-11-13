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
    inprogress: PostIt[];
    testing: PostIt[];
    done: PostIt[];

    constructor(private firebaseService: FirebaseService, private dragulaService: DragulaService) {


        this.dragulaSubscriptions(dragulaService);
    }

    private dragulaSubscriptions(dragulaService: DragulaService) {
        dragulaService.drag.subscribe((value) => { this.onDrag(value.slice(1)); });
        dragulaService.drop.subscribe((value) => { this.onDrop(value.slice(1)); });
        dragulaService.over.subscribe((value) => { this.onOver(value.slice(1)); });
        dragulaService.out.subscribe((value) => { this.onOut(value.slice(1)); });
        dragulaService.dropModel.subscribe((value) => { this.onDropModel(value.slice(1)) });

    }

    private onDrag(args) {
        let [e, el] = args;


    }

    private onDrop(args) {

        console.log()
        //this.addToAnotherBag(args,"/todo","/inprogress");

    }

    private onDropModel(args) {

        console.log(args)
        var postItId: string = args[0].id;
        var fromCollection: string = args[2].id;
        var toCollection: string = args[1].id;
        this.addToAnotherBag(postItId, `/${fromCollection}`, `/${toCollection}`);

    }

    private addToAnotherBag(postItId: string, fromCollection: string, toCollection: string) {

        var postit = this.firebaseService.findById(postItId, fromCollection);
        this.firebaseService.delete(postItId, fromCollection);
        this.firebaseService.save(postit, toCollection);

    }

    private onOver(args) {
        let [e, el, container] = args;

    }

    private onOut(args) {
        let [e, el, container] = args;

    }



    public deleteItem(collection:string ,key: string) {
        this.firebaseService.delete(key, `${collection}`);
    }

   

    public ngOnInit() {


        this.firebaseService.getCollection("/todo").subscribe(
            (items) => this.todos = items
        );

        this.title = "Lista de tareas";
        this.firebaseService.getCollection("/inprogress").subscribe(
            (items) => this.inprogress = items
        );
        this.firebaseService.getCollection("/testing").subscribe(
            (items) => this.testing = items
        );
        this.firebaseService.getCollection("/done").subscribe(
            (items) => this.done = items
        );


    }

}