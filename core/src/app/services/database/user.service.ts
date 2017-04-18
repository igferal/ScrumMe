import { User } from './../../model/user';
import { IUserService } from './IUserService';
import { Observable, Subject } from 'rxjs/Rx';
import { PostIt } from './../../model/post.it';
import { BoardColumn } from './../../model/boardColumn';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Injectable, OnInit } from '@angular/core';
import { IBoardService } from './IBoardService';
import { Board } from './../../model/board';



@Injectable()
export class UserService implements IUserService, OnInit {

    private currentUser: string;

    /**
     * Obtengo el ID del usuario actual del sistema
     */
    constructor(private af: AngularFire) {
        this.af.auth.subscribe((user) => {
            if (user != null) {
                this.currentUser = user.uid;
            }
        });

    }

    /**
     * Metodo que nos devuelve al usuario actual de la base da datos
     */
    public getCurrentDeveloper(): FirebaseObjectObservable<any> {

        return this.af.database.object(`users/${this.currentUser}`);

    }

    public getCurrentDeveloperById(uid: string): FirebaseObjectObservable<any> {

        return this.af.database.object(`users/${uid}`);

    }

    public updatePasword(user: User) {
        this.af.database.object(`users/${user.uid}`).update(user)
    }

    /**
  * Metodo que nos crea usuarios, pendiente de refactorización
  */
    public createUser(user: User) {

        this.af.database.object(`/users/${user.uid}`).set(user);

    }

    public isRegistered(): Observable<any> {

        return this.af.auth;
    }

    ngOnInit() {

    }

}