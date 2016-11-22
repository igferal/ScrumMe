import { PostIt } from './post.it';
export class Board {



    private _name: string;
    private _date: Date;
    private _todo: PostIt[];
    private _inprogress: PostIt[];
    private _testing: PostIt[];
    private _done: PostIt[];
    private _owner: string;

    constructor(name: string, date: Date, todo?: PostIt[], inprogress?: PostIt[], testing?: PostIt[], done?: PostIt[]) {

        this._name = name;
        this._date = date;
        this.inicializateBoard(this._todo, todo);
        this.inicializateBoard(this._inprogress, inprogress);
        this.inicializateBoard(this._testing, testing);
        this.inicializateBoard(this._done, done);


    }



    private inicializateBoard(myBoard: PostIt[], newBoard: PostIt[]) {

        if (newBoard === null) {
            myBoard = []
        }
        myBoard = newBoard;

    }

    public set owner(owner: string) {

        this._owner = owner;

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