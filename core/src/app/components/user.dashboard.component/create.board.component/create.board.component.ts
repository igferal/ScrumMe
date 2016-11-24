import { Board } from './../../../model/board';
import { FirebaseService } from './../../../services/database/firebase.service';
import { Component, Output, EventEmitter } from '@angular/core';



@Component({
    moduleId: 'createBoard',
    selector: 'createBoard',
    templateUrl: './create.board.component.html',
    providers: [FirebaseService]

})
export class CreateBoardComponent {


    private name: string;
    private date: Date;
    @Output() notify = new EventEmitter<boolean>();
    private mails: string;

    constructor(private firebaseService: FirebaseService) { }


    /**
     * Metodo que gestiona la creación de tablones
     */
    public onSubmit() {

        let splitted: string[] = this.mails.split(",");
        this.firebaseService.saveBoard(new Board(this.name, this.date),splitted);
        this.notify.emit(true);


    }

}

