import { DestroySubscribers } from '../../../util/unsuscribe.decorator';
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
@DestroySubscribers()
export class ColumnComponent implements OnInit {

    private notes: PostIt[];

    @Input() private colKey: string;
    @Input() private colName: string;
    @Input() private boardKey: string;
    public subscribers: any = {};
    public options: any[]

    constructor(private firebaseService: FirebaseService) {

        this.options = [
            {
                label: 'Editar', icon: 'fa fa-pencil-square-o', command: () => {
                    this.edit();
                }
            },
            {
                label: 'Delete', icon: 'fa-close', command: () => {
                    this.delete();
                }
            }
        ];
    }

    /**
   * Metodo que nos gestiona el borrado de notas
   */
    public onNotify(collection: string, key: string) {
        this.firebaseService.delete(key, `column_tasks/${this.boardKey}/${this.colKey}`);
    }

    public edit() {

    }

    public delete() {

    }

    ngOnInit() {

        this.subscribers.subscription = this.firebaseService.getCollection(`column_tasks/${this.boardKey}/${this.colKey}`).subscribe((notes) => {

            this.notes = notes;

        });

    }
}
