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


    constructor(private af: AngularFire, private dragulaService: DragulaService) {

        dragulaService.setOptions('bag-one', {
            revertOnSpill: true
        });

        dragulaService.setOptions('bag-two', {
            revertOnSpill: true
        });

        dragulaService.dropModel.subscribe((value) => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value) => {
            this.onRemoveModel(value.slice(1));
        });

    }

    private onDropModel(args) {
        console.log(`${args} On drop`);
        let [el, target, source] = args;
        // do something else
    }

    private onRemoveModel(args) {
        console.log(`${args} On remove`);

        let [el, source] = args;
        // do something else
    }

    deleteItem(key: string) {
        this.items.remove(key);
    }

    ngOnInit() {

        this.items = this.af.database.list('/todo');
        this.title = "Lista de tareas";
        this.cosos = this.af.database.list('/inprogress');

    }

}