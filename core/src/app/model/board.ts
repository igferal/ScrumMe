import { BoardColumn } from './boardColumn';
import { PostIt } from './post.it';
export class Board {



    private _name: string;
    private _date: Date;
    private _boardColums: Array<BoardColumn>;
    private _owner: string;

    constructor(name: string, date: Date) {

        this._name = name;
        this._date = date;
        this.inicializateBoard();

    }



    private inicializateBoard() {

        this._boardColums = new Array<BoardColumn>();
        let tasks = new Array<PostIt>();
        tasks.push(new PostIt('none', 'none', 0, 'none'));


        this._boardColums.push(new BoardColumn(
            tasks, "To do"
        ));

        this._boardColums.push(new BoardColumn(
            tasks, "in progress"
        ));

        this._boardColums.push(new BoardColumn(
            tasks, "testing"
        ));

        this._boardColums.push(new BoardColumn(
            tasks, "done"
        ));

    }

    public set owner(owner: string) {

        this._owner = owner;

    }

    public get boardColumns() {

        return this._boardColums;

    }


    public get name() {
        return this._name;
    }

    public get date() {
        return this._date;
    }



}
