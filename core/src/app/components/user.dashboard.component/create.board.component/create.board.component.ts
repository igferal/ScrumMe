import { PostIt } from '../../../model/post.it';
import { BoardColumn } from './../../../model/boardColumn';
import { Board } from './../../../model/board';
import { FirebaseService } from './../../../services/database/firebase.service';
import { Component, Output, EventEmitter } from '@angular/core';



@Component({
    moduleId: 'createBoard',
    selector: 'createBoard',
    templateUrl: './create.board.component.html'
})
export class CreateBoardComponent {


    private name: string;
    private date: Date;
    @Output() notify = new EventEmitter<boolean>();
    private mails: string;
    private columns: string;

    constructor(private firebaseService: FirebaseService) {
        this.mails = '';
        this.columns = '';
    }


    /**
     * Metodo que gestiona la creación de tablones
     */
    public onSubmit() {
        let splitted: string[];
        let board: Board = new Board(this.name, this.date);
        let boardCol: BoardColumn;
        let colsSplitted: string[];

        if (this.mails.length > 0) {
            splitted = this.mails.split(",");
        }

        if (this.columns.length > 0) {
            colsSplitted = this.columns.split(",");
            colsSplitted.forEach((colName) => {

                boardCol = new BoardColumn(new Array<PostIt>(), colName);
                board.boardColumns.push(boardCol);
            });
        }
        new Board(this.name, this.date);
        this.firebaseService.saveBoard(board, splitted);
        this.notify.emit(true);
        this.cleanFields();

    }

    private cleanFields() {

        this.name = '';
        this.date = null;
        this.mails = '';

    }

}

