import { element } from 'protractor';
import { User } from './../../model/user';
import { DestroySubscribers } from '../../util/unsuscribe.decorator';
import { UserService } from './../../services/database/user.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseAuthentication } from '../../services/authentication/firebase.authentication'
import { Router } from '@angular/router';


@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [FirebaseAuthentication, UserService],

})

@DestroySubscribers()
export class SignUpComponent implements OnInit {

    public email: string;
    public password: string;
    public passwordAgain: string;
    public name: string;
    public surname: string;
    public msgs = [];
    public subscribers: any = {};
    public isEditing: boolean;
    public h1Message: string;
    public buttonMessage: string;
    public currentUser: any;
    public oldPassword: string;


    constructor(public firebaseAuth: FirebaseAuthentication, public userService: UserService,
        public router: Router) {
    }


    /**
     * Metodo que gestiona el envio de usuarios para su creacion 
     */
    public onSubmit() {

        if (this.passwordLength()) {
            if (this.passwordMatch()) {

                if (!this.isEditing) {
                    this.signUp(this.name, this.surname, this.email, this.password);
                }
                else {
                    this.editUser();
                }

            } else {
                this.showError("Las contraseñas no coinciden");
            }
        } else {
            this.showError("La contraseña ha de tener una longitud mayor o igual de 6 caracteres")
        }
        this.clearPassword();
    }

    public editUser() {

        let user = new User(this.name, this.surname, this.currentUser._email, this.currentUser._uid);
        this.firebaseAuth.changePassword(this.password, this.oldPassword, user.email);
        this.userService.updatePasword(user);
        this.redirect()

    }

    public saveUser() {

    }

    /**
     *  Limpia los campos de contraseñas
     */
    public clearPassword() {
        this.password = '';
        this.passwordAgain = '';
    }

    /**
     * Obtiene si la contraseña tiene la longitud necesaria
     */
    public passwordLength(): boolean {

        return (this.password.length >= 6);
    }

    /**
     * Comprueba si las contraseñas coinciden
     */
    public passwordMatch(): boolean {

        return (this.password === this.passwordAgain);
    }

    /**
     * Método que gestiona el ennvio del usuario a la base de datos, y nos confirma si ha podido crearse
     * Si se ha creado nos redirigirá al UserDashboardComponent
     * Si no es posible se nos muestra el error que nos proporciona la base de datos
     */
    public signUp(name: string, surname: string, email: string, password: string) {
        this.email = email;
        this.password = password;
       this.subscribers.subscription = this.firebaseAuth.signUp(email, password).subscribe(
            (result) => {
                console.log(result);
                this.createUser(name, surname, email, result.uid);
                this.redirect();
            },
            (error) => {
                this.showError(error);
            });
    }

    /**
     * Crea el objeto usuario que será llevado a la base de datos
     */
    public createUser(name: string, surname: string, email: string, uid: string) {

        let user: User = new User(name, surname, email, uid);
        console.log(user);
        this.userService.createUser(user);

    }
    /**
     * Metodo que redirige al dashboard se usuario
     */
    public redirect() {

        this.router.navigate(['/dashboard']);

    }
    public showError(errorMessage: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error!', detail: errorMessage });
    }

    ngOnInit() {

        this.subscribers.subscription = this.userService.isRegistered().subscribe((user) => {
            if (user) {
                this.subscribers.subscription = this.userService.getCurrentDeveloperById(user.uid).subscribe((suscribedUser) => {
                    this.setCurrentFields(suscribedUser);
                    this.putMessages('Editar usuario', 'Editar');
                    this.isEditing = true;
                    this.currentUser = suscribedUser;
                })
            }
            else {
                this.putMessages('Registrar usuario', 'Registrar');

            }
        });

    }

    private setCurrentFields(user: any) {
        console.log(user);
        this.name = user._name;
        this.surname = user._surmame;
    }

    private putMessages(h1: string, button: string) {

        this.h1Message = h1;
        this.buttonMessage = button;

    }

}
