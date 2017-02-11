import { FirebaseService } from './../../../services/database/firebase.service';
import { PostIt } from './../../../model/post.it';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: 'column.component',
    selector: 'app-column',
    templateUrl: 'column.component.html',
    styleUrls: ['./column.component.css'],
    providers: [FirebaseService]


})
export class ColumnComponent implements OnInit {

    private notes: PostIt[];

    @Input() private colKey: string;



    constructor(private firebaseService: FirebaseService) {
    }

    ngOnInit() {

        this.firebaseService.getCollection(`column_tasks/${this.colKey}`).subscribe((notes) => {

            this.notes = notes;
            console.log(notes);

        });

    }
}
