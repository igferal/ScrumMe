import { Component } from '@angular/core';
import { FirebaseAuthentication } from '../../services/authentication/firebase.authentication'
import { Router } from '@angular/router';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [FirebaseAuthentication]

})


export class LoginComponent {

    private email: string;
    private password: string;
    private authed: boolean;
    private issue: string;

    constructor(private firebaseAuth: FirebaseAuthentication, private router: Router) {
        this.authed = false;
    }



    public onSubmit() {

        this.login();

    }

    public login() {

        this.firebaseAuth.login(this.email, this.password).then((res) => {
            this.redirect(res);
        });
    }


    private redirect(res: any) {

        if (res.provider == 4) {
            this.authed = true
            this.router.navigate(['/dashboard']);
        } else {
            this.authed = true;
            this.password = "";
            this.issue = "No existe ese usuario";
        }
    }







}