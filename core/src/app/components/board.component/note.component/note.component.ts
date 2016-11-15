import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostIt } from '../../../model/post.it';


@Component({
    selector: 'note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.css']

})
export class NoteComponent {

    @Input() note: any;

    @Output() notify = new EventEmitter<string>();

    @Input() currentList: string;



    

    deleteItem() { 

        this.notify.emit(this.note.$key);
    }
}