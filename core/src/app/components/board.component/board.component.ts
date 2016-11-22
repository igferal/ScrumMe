import { Board } from './../../model/board';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class BoardComponent implements OnInit, OnDestroy {

    private todos: PostIt[];
    private inprogress: PostIt[];
    private testing: PostIt[];
    private done: PostIt[];
    private createTodo: boolean;
    private createTask: string;
    private currentUser: User;
    private board: string;
    private subscription: any;
    private subscription2: any;
    private subscription3: any;
    private subscription4: any;
    private userSubscription: any;
    private routerSubscription: any;
    private dragulaSubscription: any;



    constructor(private firebaseService: FirebaseService, private dragulaService: DragulaService, private route: ActivatedRoute) {

        this.createTask = "Añadir tarea";
        this.dragulaSubscriptions(dragulaService);
    }

    private dragulaSubscriptions(dragulaService: DragulaService) {
        this.dragulaSubscription = dragulaService.dropModel.subscribe((value) => { this.onDropModel(value.slice(1)) });

    }


    private onDropModel(args) {
        console.log(args);
        var postItId: string = args[0].id;
        var fromCollection: string = args[2].id;
        var toCollection: string = args[1].id;
        this.addToAnotherBag(postItId, `/${fromCollection}`, `/${toCollection}`);

    }

    private addToAnotherBag(postItId: string, fromCollection: string, toCollection: string) {


        this.firebaseService.addToOtherBag(this.board, postItId, fromCollection, toCollection, this.currentUser.name)

    }



    public onNotify(collection: string, key: string) {
        this.firebaseService.delete(key, `boards/${this.board}/${collection}`);
    }



    private colapseEvent(colapse) {

        this.changeState();

    }

    private changeState() {


        this.firebaseService.getBoard("boards/" + this.board);

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
        this.userSubscription = this.firebaseService.getCurrentDeveloper().subscribe((user) => {
            this.currentUser = new User(user._name, user._surname, user._email, user._uid);
        });
    }

    ngOnDestroy() {


        this.subscription.unsubscribe();
        this.subscription2.unsubscribe();
        this.subscription3.unsubscribe();
        this.subscription4.unsubscribe();
        this.userSubscription.unsubscribe();
        this.routerSubscription.unsubscribe();
        this.dragulaSubscription.unsubscribe();


    }

    private inicializateCollections() {

        this.routerSubscription = this.route.params
            .switchMap((params: Params) => this.board = params['id'])
            .subscribe((board) => {
            });

        this.subscription = this.firebaseService.getCollection(`boards/${this.board}/_todo`).subscribe(
            (items) => this.todos = items
        );

        this.subscription2 = this.firebaseService.getCollection(`boards/${this.board}/_inprogress`).subscribe(
            (items) => this.inprogress = items
        );
        this.subscription3 = this.firebaseService.getCollection(`boards/${this.board}/_testing`).subscribe(
            (items) => this.testing = items
        );
        this.subscription4 = this.firebaseService.getCollection(`boards/${this.board}/_done`).subscribe(
            (items) => this.done = items
        );


    }

}

