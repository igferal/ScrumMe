import { BoardColumn } from './boardColumn';
import { PostIt } from './post.it';
export class Board {



    public name: string;
    public date: Date;
    public boardColumns: Array<BoardColumn>;
    public owner: string;
    public gitHubRepo: string;
    public travisRepo: string;

    constructor(name: string, date: Date) {

        this.name = name;
        this.date = date;
        this.inicializateBoard();

    }


  

    private inicializateBoard() {

        this.travisRepo = '';
        this.gitHubRepo = '';
        this.boardColumns = new Array<BoardColumn>();

    }





}
