import { Component, OnInit } from '@angular/core';
import { FirebaseAuthentication } from '../../services/authentication/firebase.authentication'
import { Router } from '@angular/router';


@Component({
    selector: 'login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html',
    providers: [FirebaseAuthentication]

})


export class LoginComponent implements OnInit {

    public email: string;
    public password: string;
    public authed: boolean;
    public issue: string;
    public msgs = [];

    constructor(public firebaseAuth: FirebaseAuthentication, public router: Router) {
        this.authed = false;
    }

    public onSubmit() {

        this.login();
    }

    /** 
    * Método que envia el usuario y la contraseña al servicio de autenticación 
    */
    public login() {

        //    this.firebaseAuth.loginWithGit();

        this.firebaseAuth.login(this.email, this.password).subscribe(
            (res) => {
                this.authed = true;
                this.router.navigate(['/dashboard']);
            },
            (error) => {
                this.authed = true;
                this.password = '';
                this.showInfo();
                console.log(error);
            });

    }

    showInfo() {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error!', detail: 'No existe ese usuario' });
    }



    ngOnInit() {


    }


}
