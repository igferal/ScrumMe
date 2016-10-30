import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent } from './heroes.component';
import { HeroService } from './hero.service';
import { DashboardComponent } from './dashboard.component'
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';


export const firebaseConfig = {
  apiKey: "AIzaSyBXNhwkOT_iu_9HIktEw78YGCydAjs6RQ0",
    authDomain: "angularintegration-3b520.firebaseapp.com",
    databaseURL: "https://angularintegration-3b520.firebaseio.com",
    storageBucket: "angularintegration-3b520.appspot.com",
    messagingSenderId: "87154413034"
};



@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),

    FormsModule, RouterModule.forRoot([
      {
        path: 'detail/:id',
        component: HeroDetailComponent
      },

      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'heroes',
        component: DashboardComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent
  ],
  providers: [
    HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}