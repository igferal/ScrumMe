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

    private email: string;
    private password: string;
    private authed: boolean;
    private issue: string;
    private msgs = [];

    constructor(private firebaseAuth: FirebaseAuthentication, private router: Router) {
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
    private redirect(res: any) {

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
