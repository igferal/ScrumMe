import { Component } from '@angular/core';
import { FirebaseAuthentication } from '../../services/authentication/firebase.authentication'
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { FirebaseService } from '../../services/database/firebase.service';


@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    providers: [FirebaseAuthentication, FirebaseService],


})


export class SignUpComponent {

    email: string;
    password: string;
    passwordAgain: string;
    name: string;
    surname: string;
    authed: boolean;

    constructor(private firebaseAuth: FirebaseAuthentication, private firebaseService: FirebaseService,
        private router: Router) {
        this.authed = false;
    }

    getUser() {

        this.firebaseAuth.getUser();

    }

    onSubmit() { 
        console.log("vamos mejorando")
    }

    signUp(name: string, surname: string, email: string, password: string) {
        this.email = email;
        this.password = password;
        this.firebaseAuth.signUp(email, password).then((res) => {
            if (res.provider == 4) {
                this.createUser(name, surname, email, res.uid);
                this.redirect(res);
            }
            else {
                alert("No existe ese usuario, Chavalin!!!");
            }


        });
    }

    createUser(name: string, surname: string, email: string, uid: string) {

        var user: User = new User(name, surname, email, uid);
        this.firebaseService.createUser(user);

    }

    private redirect(res: any) {

        this.authed = true
        this.router.navigate(['/board']);

    }







}