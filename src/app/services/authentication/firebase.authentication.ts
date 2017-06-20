import { passBoolean } from 'protractor/built/util';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { IAuthentication } from './IAuthentication';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { CanActivate, Router, } from '@angular/router';

@Injectable()
export class FirebaseAuthentication implements IAuthentication, CanActivate {

    constructor(public auth: AngularFireAuth, public router: Router) { }

    public getUser() {
        this.auth.authState.subscribe((auth) => {
            return auth;
        });
    }


    public signUp(email: string, password: string): Observable<any> {
        let creds: any = { email: email, password: password };
        return new Observable((observer) => {
            this.auth.auth.createUserWithEmailAndPassword(email, password).catch((err) => {
                let error = { provider: 3, error: err.message };
                observer.error(error)
            }).then(result => {
                observer.next(result);
                observer.complete();
            });
        })
    }

    public login(email: string, password: string): Observable<any> {
        let creds: any = { email: email, password: password };


        return new Observable((observer) => {
            this.auth.auth.signInWithEmailAndPassword(email, password).catch((err) => {
                let error = { provider: 3, error: err.message };
                observer.error(error)
            }).then(result => {
                observer.next(result);
                observer.complete();
            });


        })


    }


    public changePassword(password: string, oldPassword: string, email: string) {

        let creds: any = { email: email, password: oldPassword };
        this.auth.auth.signInWithEmailAndPassword(email, oldPassword).then((res) => {
            
            this.auth.auth.currentUser.updatePassword(email);

        })

    }


    public logout() {
        this.auth.authState
        this.auth.auth.signOut();
    }

    public canActivate(): Observable<boolean> {
        return this.auth.authState.take(1).map(auth => {
            if (!auth) {
                this.router.navigateByUrl('/login');
                return true;
            }
            return !!auth;
        });

    }

}
