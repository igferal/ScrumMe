import { Board } from './../../model/board';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostIt } from '../../model/post.it';
import { FirebaseListObservable } from 'angularfire2';
import { DragulaModule, DragulaService } from '../../../../node_modules/ng2-dragula/ng2-dragula';
import { FirebaseService } from '../../services/database/firebase.service';
import { User } from './../../model/user';
import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'list',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css'],
    providers: [FirebaseService]

})
export class BoardComponent implements OnInit {

    private todos: PostIt[];
    private inprogress: PostIt[];
    private testing: PostIt[];
    private done: PostIt[];
    private createTodo: boolean;
    private createTask: string;
    private currentUser: User;
    private board: string;


    constructor(private firebaseService: FirebaseService, private dragulaService: DragulaService, private route: ActivatedRoute) {

        this.createTask = "Añadir tarea"
        this.dragulaSubscriptions(dragulaService);
    }

    private dragulaSubscriptions(dragulaService: DragulaService) {
        dragulaService.dropModel.subscribe((value) => { this.onDropModel(value.slice(1)) });

    }


    private onDropModel(args) {

        var postItId: string = args[0].id;
        var fromCollection: string = args[2].id;
        var toCollection: string = args[1].id;
        this.addToAnotherBag(postItId, `/${fromCollection}`, `/${toCollection}`);

    }

    private addToAnotherBag(postItId: string, fromCollection: string, toCollection: string) {

        this.firebaseService.addToOtherBag(this.board,postItId, fromCollection, toCollection, this.currentUser.name)

    }



    public onNotify(collection: string, key: string) {
        this.firebaseService.delete(key, `/${collection}`);
    }



    private colapseEvent(colapse) {

        this.changeState();

    }

    private changeState() {
        if (this.createTodo) {
            this.createTask = "Añadir tarea";
            this.createTodo = !this.createTodo;

        }
        else {
            this.createTask = "Colapsar";
            this.createTodo = !this.createTodo;

        }
    }



    public ngOnInit() {
        this.suscribeUser();
        this.inicializateCollections();
    }


    private suscribeUser() {
        this.firebaseService.getCurrentDeveloper().subscribe((user) => {
            this.currentUser = new User(user._name, user._surname, user._email, user._uid);
        });
    }

    private inicializateCollections() {

        this.route.params
            .switchMap((params: Params) => this.board=params['id'])
            .subscribe((board) => {
            });
        

        this.firebaseService.getCollection(`boards/${this.board}/_todo`).subscribe(
            (items) => this.todos = items
        );

        this.firebaseService.getCollection(`boards/${this.board}/_inprogress`).subscribe(
            (items) => this.inprogress = items
        );
        this.firebaseService.getCollection(`boards/${this.board}/_testing`).subscribe(
            (items) => this.testing = items
        );
        this.firebaseService.getCollection(`boards/${this.board}/_done`).subscribe(
            (items) => this.done = items
        );


    }

}

