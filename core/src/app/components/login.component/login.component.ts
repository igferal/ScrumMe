import { Component } from '@angular/core';
import { FirebaseAuthentication } from '../../services/authentication/firebase.authentication'


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [FirebaseAuthentication]

})


export class LoginComponent {

    email: string;
    password: string;
    authed: boolean;

    constructor(private firebaseAuth: FirebaseAuthentication) {
        this.authed = false;
    }



    signUp(email: string, password: string) {
        this.email = email;
        this.password = password;
        this.firebaseAuth.signUp(this.email, this.password).then((res) => {
            alert(res);
        });
    }

    login(email: string, password: string) {

        this.email = email;
        this.password = password;

        this.firebaseAuth.login(this.email, this.password).then((res) => {
            console.log(res);
            if (res.provider == 4) {
                this.authed = true
            }

        });
    }


    logout() {

        this.firebaseAuth.logout();

    }



}