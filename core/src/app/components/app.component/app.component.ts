import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseAuthentication } from '../../services/authentication/firebase.authentication'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FirebaseAuthentication]
})
export class AppComponent implements OnInit {
  title: string;
  auth: any;

  constructor(private authservice: FirebaseAuthentication, private router: Router) { }

  /**
   * Método de salida de sesión
   */
  public logout() {
    this.authservice.logout();
  }

  /* Inicación de componente general del sistema que nos inicia el usuario actual del sistema, el cual será utilizado
     para controlar la navegación entre componentes.
     Si el usuario es null no se permitirá acceder a las zonas de usuario registrado
     Si el usuario no es null, tendremos acceso a las zonas registradas por cada usuario
   */
  public ngOnInit() {
    // Subscripción 
    this.authservice.af.auth.subscribe((user) => {
      this.auth = user;
    });

  }

}