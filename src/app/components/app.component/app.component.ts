import { InvitationsService } from './../../services/database/invitations.service';
import { BoardService } from './../../services/database/board.service';
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
  public title: string;
  public auth: any;
  public numInvitations;
  public subscription: any;


  constructor(private authservice: FirebaseAuthentication, private router: Router, public boardService: BoardService,public invitationsService : InvitationsService) { }

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
    this.authservice.auth.authState.subscribe((user) => {

      this.auth = user;
      if (user) {
        this.loadBellNotifications();
      }else{
        if(this.subscription){
          this.subscription.unsubscribe();
        }
      }

    });


  }

  loadBellNotifications() {
    this.subscription = this.invitationsService.getInvitationsToCollab().subscribe((collabs) => {

      if (collabs) {

        this.numInvitations = collabs.length;
      }
    })
  }

}