import { PostIt } from './post.it';
export class Board {



    private _name: string;
    private _date: Date;
    private _todo: PostIt[];
    private _inprogress: PostIt[];
    private _testing: PostIt[];
    private _done: PostIt[];

    constructor(name: string, date: Date, todo?: PostIt[], inprogress?: PostIt[], testing?: PostIt[], done?: PostIt[]) {

        this._name = name;
        this._date = date;
        this._todo = [];
        this._testing = [];
        this._inprogress = [];
        this._done = [];

    }

    private incializateBoard(board: PostIt[]) {

        board.push(new PostIt("none", "none", 0, "none"))
    }



    public get name() {
        return this._name;
    }

    public get date() {
        return this._date;
    }

    public get todo() {
        return this._todo;
    }

    public get inprogress() {
        return this._inprogress;
    }

    public get testing() {
        return this._testing;
    }

    public get done() {
        return this._done;
    }




}