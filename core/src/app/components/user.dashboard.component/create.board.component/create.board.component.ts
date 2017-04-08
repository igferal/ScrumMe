import { BoardService } from './../../../services/database/board.service';
import { PostIt } from '../../../model/post.it';
import { BoardColumn } from './../../../model/boardColumn';
import { Board } from './../../../model/board';
import { Component, Output, EventEmitter } from '@angular/core';



@Component({
    moduleId: 'createBoard',
    selector: 'createBoard',
    templateUrl: './create.board.component.html',
    styleUrls: ['./create.board.component.scss'],
    providers: [BoardService]
})
export class CreateBoardComponent {


    private name: string;
    private date: Date;
    @Output() notify = new EventEmitter<boolean>();
    private mails: string;
    private columns: string;
    private gitHubRepo: string;
    private travisRepo: string;
    private red : string = 'red';


    constructor(private boardService: BoardService) {
        this.mails = '';
        this.columns = '';
    }


    /**
     * Metodo que gestiona la creación de tablones
     */
    public onSubmit() {



        let splitted: string[];
        let board: Board = new Board(this.name, this.date);
        board.putGitRepo(this.gitHubRepo);
        board.putTravisRepo(this.travisRepo);
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

        this.boardService.saveBoard(board, splitted);
        this.notify.emit(true);
        this.cleanFields();

    }

    private cleanFields() {

        this.name = '';
        this.date = null;
        this.mails = '';
        this.columns = '';
        this.gitHubRepo = '';
        this.travisRepo = '';

    }

}

