import { Component } from '@angular/core';
import { FirebaseAuthentication } from '../../services/authentication/firebase.authentication'
import { Router } from '@angular/router';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [FirebaseAuthentication]

})


export class LoginComponent {

    email: string;
    password: string;
    authed: boolean;

    constructor(private firebaseAuth: FirebaseAuthentication, private router: Router) {
        this.authed = false;
    }

    getUser() {

        this.firebaseAuth.getUser();

    }


    signUp(email: string, password: string, ) {
        this.email = email;
        this.password = password;
        this.firebaseAuth.signUp(this.email, this.password).then((res) => {

            this.redirect(res);

        });
    }

    private redirect(res: any) {

        if (res.provider == 4) {
            this.authed = true
            this.router.navigate(['/board']);
        } else {
            alert("No existe ese usuario, Chavalin!!!");
        }

    }

    login(email: string, password: string) {

        this.email = email;
        this.password = password;
        this.firebaseAuth.login(this.email, this.password).then((res) => {
            this.redirect(res);
        });
    }


    logout() {

        this.firebaseAuth.logout();

    }





}