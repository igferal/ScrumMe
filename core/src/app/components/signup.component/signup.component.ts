import { UserService } from './../../services/database/user.service';
import { Component } from '@angular/core';
import { FirebaseAuthentication } from '../../services/authentication/firebase.authentication'
import { Router } from '@angular/router';
import { User } from '../../model/user';


@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    providers: [FirebaseAuthentication, UserService],


})


export class SignUpComponent {

    private email: string;
    private password: string;
    private passwordAgain: string;
    private name: string;
    private surname: string;
    private msgs = [];


    constructor(private firebaseAuth: FirebaseAuthentication, private userService: UserService,
        private router: Router) {
    }


    /**
     * Metodo que gestiona el envio de usuarios para su creacion 
     */
    public onSubmit() {

        if (this.passwordLength()) {
            if (this.passwordMatch()) {
                this.signUp(this.name, this.surname, this.email, this.password);
            } else {
                this.showError("Las contraseñas no coinciden");
            }
        } else {
            this.showError("La contraseña ha de tener una longitud mayor o igual de 6 caracteres")
        }
        this.clearPassword();
    }


    /**
     *  Limpia los campos de contraseñas
     */
    private clearPassword() {
        this.password = '';
        this.passwordAgain = '';
    }

    /**
     * Obtiene si la contraseña tiene la longitud necesaria
     */
    private passwordLength(): boolean {

        return (this.password.length >= 6);
    }

    /**
     * Comprueba si las contraseñas coinciden
     */
    private passwordMatch(): boolean {

        return (this.password === this.passwordAgain);
    }

    /**
     * Método que gestiona el ennvio del usuario a la base de datos, y nos confirma si ha podido crearse
     * Si se ha creado nos redirigirá al UserDashboardComponent
     * Si no es posible se nos muestra el error que nos proporciona la base de datos
     */
    private signUp(name: string, surname: string, email: string, password: string) {
        this.email = email;
        this.password = password;
        this.firebaseAuth.signUp(email, password).then((res) => {
            if (res.provider === 4) {
                this.createUser(name, surname, email, res.uid);
                this.redirect(res);
            } else {

                this.showError(res.error);
            }

        });
    }

    /**
     * Crea el objeto usuario que será llevado a la base de datos
     */
    private createUser(name: string, surname: string, email: string, uid: string) {

        let user: User = new User(name, surname, email, uid);
        this.userService.createUser(user);

    }
    /**
     * Metodo que redirige al dashboard se usuario
     */
    private redirect(res: any) {

        this.router.navigate(['/dashboard']);

    }
    private showError(errorMessage: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error!', detail: errorMessage });
    }

}
