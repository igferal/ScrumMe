import { UserDashboardComponent } from './../user.dashboard.component/user.dashboard.component';
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

    private email: string;
    private password: string;
    private passwordAgain: string;
    private name: string;
    private surname: string;
    private problemWithSignUp: boolean;
    private passNotMAtch: boolean;
    private issue: string;
    private passNotLongEnough: boolean;


    constructor(private firebaseAuth: FirebaseAuthentication, private firebaseService: FirebaseService,
        private router: Router) {
        this.issue = "";
    }


    /**
     * Metodo que gestiona el envio de usuarios para su creacion 
     */
    public onSubmit() {

        if (this.passwordLength()) {
            if (this.passwordMatch()) {
                this.passNotLongEnough = false;
                this.signUp(this.name, this.surname, this.email, this.password);
                this.passNotMAtch = false;
            }
            else {
                this.passNotMAtch = true;
            }
        }
        else {
            this.passNotLongEnough = true;
        }
        this.clearPassword();
    }


    /**
     *  Limpia los campos de contraseñas
     */
    private clearPassword() {
        this.password = "";
        this.passwordAgain = "";
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
            console.log(res)
            if (res.provider == 4) {
                this.createUser(name, surname, email, res.uid);
                this.redirect(res);
            }
            else {

                this.issue = res.error;
                this.problemWithSignUp = true;
            }

        });
    }

     /**
      * Crea el objeto usuario que será llevado a la base de datos
      */
    private createUser(name: string, surname: string, email: string, uid: string) {

        var user: User = new User(name, surname, email, uid);
        this.firebaseService.createUser(user);

    }
    
    /**
     * Metodo que redirige al dashboard se usuario
     */
    private redirect(res: any) {

        this.router.navigate(['/dashboard']);

    }







}