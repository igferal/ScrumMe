import { Component, OnInit, Input } from '@angular/core';
import { PostIt } from '../../../model/post.it';


@Component({
    selector: 'note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.css']

})
export class NoteComponent {

    @Input() note: PostIt;

    click(){
        console.log(this.note);
    }
    

}