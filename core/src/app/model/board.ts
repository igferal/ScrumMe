import { BoardColumn } from './boardColumn';
import { PostIt } from './post.it';
export class Board {



    private _name: string;
    private _date: Date;
    private _boardColums: Array<BoardColumn>;
    private _owner: string;
    public gitHubRepo: string;
    public travisRepo: string;

    constructor(name: string, date: Date) {

        this._name = name;
        this._date = date;
        this.inicializateBoard();

    }


    public putGitRepo(url: string) {
        if (url !== "") {
            let urlSplitted = url.split('/');
            this.gitHubRepo = `${urlSplitted[urlSplitted.length - 2]}/${urlSplitted[urlSplitted.length -1]}`;
        }

    }

    public putTravisRepo(url: string) {
        if (url !== "") {
            let urlSplitted = url.split('/');
            this.travisRepo = `${urlSplitted[urlSplitted.length - 2]}/${urlSplitted[urlSplitted.length -1]}`;
        }

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
