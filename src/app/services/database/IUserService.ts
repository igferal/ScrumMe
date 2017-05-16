import { User } from './../../model/user';
import { PostIt } from './../../model/post.it';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { BoardColumn } from './../../model/boardColumn';

export interface IUserService {



    createUser(user: User);

    getCurrentDeveloper(): FirebaseObjectObservable<any>;
}