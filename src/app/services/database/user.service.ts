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
export class UserService implements IUserService {


    /**
     * Obtengo el ID del usuario actual del sistema
     */
    constructor(private database: AngularFireDatabase, public auth: AngularFireAuth) {

    }

    public getCurrentDeveloper(): FirebaseObjectObservable<any> {

        return this.database.object(`users/${this.auth.auth.currentUser.uid}`);

    }

    public getDeveloperById(uid: string): FirebaseObjectObservable<any> {

        return this.database.object(`users/${uid}`);

    }

    public update(user: User) {
        this.database.object(`users/${user.uid}`).update(user)
    }

    /**
  * Metodo que nos crea usuarios, pendiente de refactorización
  */
    public createUser(user: User) {

        this.database.object(`/users/${user.uid}`).set(user);

    }

    public isUserLogged(): Observable<any> {

        return this.auth.authState;
    }



}