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
