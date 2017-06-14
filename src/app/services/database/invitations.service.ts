import { IInvitationsService } from './IInvitationsService';
import { User } from './../../model/user';
import { IUserService } from './IUserService';
import { Observable, Subject } from 'rxjs/Rx';
import { PostIt } from './../../model/post.it';
import { BoardColumn } from './../../model/boardColumn';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable, OnInit } from '@angular/core';
import { IBoardService } from './IBoardService';
import { Board } from './../../model/board';
import { AngularFireAuth } from 'angularfire2/auth';



@Injectable()
export class InvitationsService implements IInvitationsService {



    /**
     * Obtengo el ID del usuario actual del sistema
     */
    constructor(private database: AngularFireDatabase, public auth: AngularFireAuth) {

    }


    public declineCollaboration(collabKey: string) {

        this.database.list(`collabs/${this.auth.auth.currentUser.uid}`).remove(collabKey);

    }

    public acceptColab(collabKey: string, board: any, boardKey: string) {

        this.declineCollaboration(collabKey);
        this.addColaborator(this.auth.auth.currentUser.uid, board, boardKey);

    }

    public getInvitationsToCollab(): FirebaseListObservable<any> {

        return this.database.list(`collabs/${this.auth.auth.currentUser.uid}`);

    }



    private addColaborator(uid: string, boardInfo: any, key: string) {

        this.database.object(`user_board/${uid}/${key}`).set(boardInfo);

    }

    

 

}