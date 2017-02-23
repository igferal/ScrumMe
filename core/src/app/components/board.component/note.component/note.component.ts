import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.css']

})
export class NoteComponent {

    @Input() note: any;
    @Output() notify = new EventEmitter<string>();
    @Input() board: any;
    @Input() colKey: any;
    @Input() noteKey: string;

    private showModal: boolean;


    private showDialog() {
        this.showModal = true;
    }

    private closeDialog() {
        this.showModal = false;
    }


    private deleteItem() {

        this.notify.emit(this.note.$key);
    }
}
