import { Component, OnInit } from '@angular/core';
import { PostIt } from '../../model/post.it';
import { FirebaseListObservable } from 'angularfire2';
import { DragulaModule, DragulaService } from '../../../../node_modules/ng2-dragula/ng2-dragula';
import { FirebaseService } from '../../services/database/firebase.service';


@Component({
    selector: 'list',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css'],
    providers: [FirebaseService]

})
export class BoardComponent implements OnInit {

    title: string;
    todos: PostIt[];
    inprogress: PostIt[];
    testing: PostIt[];
    done: PostIt[];
    createTodo: boolean;
    createTask: string;

    constructor(private firebaseService: FirebaseService, private dragulaService: DragulaService) {

        this.createTask = "Añadir tarea"
        this.dragulaSubscriptions(dragulaService);
    }

    private dragulaSubscriptions(dragulaService: DragulaService) {
        dragulaService.drag.subscribe((value) => { this.onDrag(value.slice(1)); });
        dragulaService.drop.subscribe((value) => { this.onDrop(value.slice(1)); });
        dragulaService.over.subscribe((value) => { this.onOver(value.slice(1)); });
        dragulaService.out.subscribe((value) => { this.onOut(value.slice(1)); });
        dragulaService.dropModel.subscribe((value) => { this.onDropModel(value.slice(1)) });

    }

    colapseEvent(colapse) {

        
        this.changeState();

    }

    changeState() {
        if (this.createTodo) {
            this.createTask = "Añadir tarea";
            this.createTodo = !this.createTodo;

        }
        else {
            this.createTask = "Colapsar";
            this.createTodo = !this.createTodo;

        }
    }

    private onDrag(args) {
        let [e, el] = args;


    }

    private onDrop(args) {


    }

    private onDropModel(args) {

        var postItId: string = args[0].id;
        var fromCollection: string = args[2].id;
        var toCollection: string = args[1].id;
        this.addToAnotherBag(postItId, `/${fromCollection}`, `/${toCollection}`);

    }

    private addToAnotherBag(postItId: string, fromCollection: string, toCollection: string) {

        var postit = this.firebaseService.findById(postItId, fromCollection);

        console.log("Voy a cambiar de columna este " + postit)
        this.firebaseService.delete(postItId, fromCollection);
        this.firebaseService.save(postit, toCollection);

    }

    private onOver(args) {
        let [e, el, container] = args;

    }

    private onOut(args) {
        let [e, el, container] = args;

    }



    public onNotify(collection: string, key: string) {
        this.firebaseService.delete(key, `/${collection}`);
    }



    public ngOnInit() {
        this.title = "Lista de tareas";
        this.inicializateCollections();
    }

    private inicializateCollections() {

        this.firebaseService.getCollection("/todo").subscribe(
            (items) => this.todos = items
        );

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

export class ModalComponent {

    public visible = false;
    private visibleAnimate = false;

    public show(): void {
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true);
    }

    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }
}