import { Component } from '@angular/core';
import { FirebaseAuthentication } from '../../services/authentication/firebase.authentication'
import { Router } from '@angular/router';


@Component({
    selector: 'login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html',
    providers: [FirebaseAuthentication]

})


export class LoginComponent {

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

        this.firebaseAuth.login(this.email, this.password).then((res) => {
            this.redirect(res);
        });

    }

    showInfo() {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error!', detail: 'No existe ese usuario' });
    }

    /**
     * Metodo que nos gestiona la respuesta que nos devuelve el servicio de autenticación
     */
    public redirect(res: any) {

        if (res.provider === 4) {
            this.authed = true;
            this.router.navigate(['/dashboard']);
        } else {
            this.authed = true;
            this.password = '';
            this.showInfo();
        }
    }


}
