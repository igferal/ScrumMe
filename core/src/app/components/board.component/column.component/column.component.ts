import { PostIt } from './../../../model/post.it';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: 'column.component',
    selector: 'app-column',
    templateUrl: 'column.component.html',
    styleUrls: ['./column.component.css'],


})
export class ColumnComponent implements OnInit {

    @Input() private notes: PostIt[];

    @Input() private columnName: string;

    @Input() private name : string;



    constructor() {
    }

    ngOnInit() {
    }
}
