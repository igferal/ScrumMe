import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { FirebaseAuthentication } from './firebase.authentication';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class AuthenticationGuard implements CanActivate {

    public _allowed: boolean;

    constructor(private af: AngularFire, private router: Router) {

        this._allowed = false;

    }

    get allowed(): boolean {
        return this.allowed;
    }


    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.af.auth.map((auth) => {
            if (!auth) {
                this.router.navigateByUrl('login');
                this._allowed = false;
                return false;
            }
            else {
                this._allowed = true
                return true;
            }
        }).take(1);
    }


}