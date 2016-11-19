import { Component, OnInit } from '@angular/core';
import { PostIt } from '../../model/post.it';
import { AppRoutingModule } from '../../router/router.component';
import { FirebaseAuthentication } from '../../services/authentication/firebase.authentication'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirebaseAuthentication]
})
export class AppComponent implements OnInit {
  title: string;
  auth: any;

  constructor(private authservice: FirebaseAuthentication) { }

  public logout() {

    this.authservice.logout();
  }

  public ngOnInit() {

    this.authservice.auth.subscribe(
      (user) => {
        this.auth = user;
      });
  }

}