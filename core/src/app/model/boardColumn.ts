import { PostIt } from './post.it';
export class BoardColumn {

    private _tasks: Array<PostIt>;
    private _columnName: string;

    constructor(tasks: Array<PostIt>, columnName: string) {

        this._tasks = tasks;
        tasks.push(new PostIt("none","none",0,"none"));
        this._columnName = columnName;

    }



    get columnName(): string {

        return this._columnName;
    }

    get tasks(): Array<PostIt> {

        return this._tasks;
    }


}