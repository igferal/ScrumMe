import { PostIt } from './../../model/post.it';
import { FirebaseListObservable } from 'angularfire2';
import { BoardColumn } from './../../model/boardColumn';

export interface ITaskService {



    getTasks(colKey: string, string, boardKey: string): FirebaseListObservable<any>

    saveTask(colKey: string, boardKey: string, postIt: PostIt);

    deleteTask(boardKey: string, colKey: string, taskKey: string)

    editTask(key: String, newPostIt: PostIt);

    addToOtherBag(board: string, postItId: string, fromCollection: string, toCollection: string, programmer: string): void;

    findTaskById(board: string, key: string, collection: string);

}