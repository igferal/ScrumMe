import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
    selector: 'note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss']

})
export class NoteComponent implements OnInit {

    @Input() note: any;
    @Output() notify = new EventEmitter<string>();
    @Input() board: any;
    @Input() colKey: any;
    @Input() noteKey: string;
    public options: any[];
    private showLogWork: boolean;

    private showLogWorkDialog() {
        this.showLogWork = true;
    }

    private removeLogWorkDialog() {
        this.showLogWork = false;
    }

    constructor() {

        this.options = [
            {
                label: 'Editar', icon: 'fa fa-pencil-square-o', command: () => {

                }
            },
            {
                label: 'Borrar', icon: 'fa-close', command: () => {
                    this.deleteItem();
                }
            },
            {
                label: 'Cargar horas', icon: 'fa fa-hourglass-o', command: () => {
                    this.showLogWorkDialog();
                }
            }
        ];

    }



    private logHours(hours: number) {

    }


    private deleteItem() {

        this.notify.emit(this.note.$key);
    }

    ngOnInit() {


    }
}
