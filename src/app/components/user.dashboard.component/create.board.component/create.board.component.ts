import { BoardService } from './../../../services/database/board.service';
import { PostIt } from '../../../model/post.it';
import { BoardColumn } from './../../../model/boardColumn';
import { Board } from './../../../model/board';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';



@Component({
    moduleId: 'createBoard',
    selector: 'createBoard',
    templateUrl: './create.board.component.html',
    styleUrls: ['./create.board.component.scss'],
    providers: [BoardService]
})
export class CreateBoardComponent implements OnInit {


    public name: string;
    public date: Date;
    @Output() notify = new EventEmitter<boolean>();
    public mails: string;
    public columns: string;
    public gitHubRepo: string;
    public travisRepo: string;
    @Input() board: Board;
    @Input() boardKey: string;
    public editing: boolean;
    public buttonMessage: string;


    constructor(public boardService: BoardService) {
        this.mails = '';
        this.columns = '';
        this.gitHubRepo = '';
        this.travisRepo = '';
        this.date = new Date();
        this.editing = false;
    }


    /**
     * Metodo que gestiona la creación de tablones
     */
    public onSubmit() {

        if (this.board) {
            this.edit();
        } else {

            this.save();
        }

    }

    public edit() {


        this.board.gitHubRepo = this.getRepo(this.gitHubRepo);
        this.board.travisRepo = this.getRepo(this.travisRepo);
        this.board.date = this.date;
        this.board.name = this.name;
        this.boardService.updateBoardInfo(this.boardKey, this.board);
        this.notify.emit(true);



    }

    public getRepo(url: string): string {
        if (url !== "") {
            let urlSplitted = url.split('/');
            return `${urlSplitted[urlSplitted.length - 2]}/${urlSplitted[urlSplitted.length - 1]}`;
        }
        else {
            return '';
        }

    }

    
    

    public save() {

        let splitted: string[];
        let board: Board = new Board(this.name, this.date);
        board.gitHubRepo = this.getRepo(this.gitHubRepo);
        board.travisRepo = this.getRepo(this.travisRepo);
        let boardCol: BoardColumn;
        let colsSplitted: string[];


        if (this.columns.length > 0) {
            colsSplitted = this.columns.split(",");
            colsSplitted.forEach((colName) => {

                boardCol = new BoardColumn(new Array<PostIt>(), colName);
                board.boardColumns.push(boardCol);
            });
        }

        this.boardService.saveBoard(board);
        this.notify.emit(true);
        this.cleanFields();


    }

    public cleanFields() {

        this.name = '';
        this.date = null;
        this.mails = '';
        this.columns = '';
        this.gitHubRepo = '';
        this.travisRepo = '';

    }

    public ngOnInit() {
        if (this.board) {
            console.log(this.boardKey);
            this.editing = true;
            this.date = this.board.date;
            this.name = this.board.name;
            this.travisRepo = this.board.travisRepo;
            this.gitHubRepo = this.board.gitHubRepo;
            this.buttonMessage = 'Editar tablero';

        } else {

            this.buttonMessage = 'Crear tablero';
        }

    }



}

