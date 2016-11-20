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

    constructor(private firebaseService: FirebaseService) { }



    public onSubmit() {

        this.firebaseService.saveBoard(new Board(this.name, this.date));
        this.notify.emit(true);


    }

}

