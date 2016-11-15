import { Component, OnInit } from '@angular/core';
import { PostIt } from '../../model/post.it';
import { AppRoutingModule } from '../../router/router.component';
import { AuthenticationGuard } from '../../services/authentication/authentication.guard'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationGuard]
})
export class AppComponent implements OnInit {
  title: string;
  auth: boolean;

  constructor(public authGuard: AuthenticationGuard) {

    console.log(authGuard._allowed);
    this.auth = authGuard._allowed;

  }


  ngOnInit() {

  }

}