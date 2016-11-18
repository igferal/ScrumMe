import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuth } from 'angularfire2';
import { IAuthentication } from './IAuthentication';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class FirebaseAuthentication implements IAuthentication, CanActivate {


    constructor(public af: AngularFire, public auth: FirebaseAuth, public router: Router) { }

    logged: Observable<boolean>


    getUser() {
        this.auth.subscribe((auth) => {
            return auth;
        });

    }






    logout() {
        this.af.auth.logout();
        console.log("Logged Out")
    }

    public canActivate(): Observable<boolean> {
        console.log("canActivate");
        return this.af.auth.take(1).map(auth => {
            console.log("auth:" + auth);
            if (!auth) {
                this.router.navigateByUrl('/login');
                return true;
            }
            return !!auth;
        });

    }

 


    signUp(email: string, password: string): any {
        var creds: any = { email: email, password: password };
        var res: Promise<boolean> = new Promise((resolve, reject) => {
            this.auth.createUser(creds).catch((err) => {

                var r = { provider: 3, error: err.message };
                return r;
            })
                .then(result => {


                    resolve(result);
                })
        });


        return res;

    }

    login(email: string, password: string): any {
        var creds: any = { email: email, password: password };
        var res: Promise<boolean> = new Promise((resolve, reject) => {
            this.auth.login(creds).catch((err) => {
                var r = { provider: 3, error: err.message };
                console.log(err);
                return r;

            }).then(result => {
                resolve(result);
            })
        });
        return res;
    }


}