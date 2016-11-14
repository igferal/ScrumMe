import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuth } from 'angularfire2';
import { IAuthentication } from './IAuthentication';


@Injectable()
export class FirebaseAuthentication implements IAuthentication {

    user = {};

    constructor(
        public af: AngularFire, public auth: FirebaseAuth
    ) {
        this.af.auth.subscribe(user => {
        });
    }


    getUser() {

        this.auth.subscribe((auth) => {

            console.log(auth);

        });
    }

    logout() {
        this.af.auth.logout();
    }


    signUp(email: string, password: string): any {
        var creds: any = { email: email, password: password };
        var res: Promise<boolean> = new Promise((resolve, reject) => {
            this.auth.createUser(creds).then(result => {
                resolve(result);
            })
        });
        return res;
    }

    login(email: string, password: string): any {
        var creds: any = { email: email, password: password };
        var res: Promise<boolean> = new Promise((resolve, reject) => {
            this.auth.login(creds).then(result => {
                resolve(result);
            })
        });
        return res;
    }


}