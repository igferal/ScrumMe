import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyBXNhwkOT_iu_9HIktEw78YGCydAjs6RQ0",
    authDomain: "angularintegration-3b520.firebaseapp.com",
    databaseURL: "https://angularintegration-3b520.firebaseio.com",
    storageBucket: "angularintegration-3b520.appspot.com",
    messagingSenderId: "87154413034"
};



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,    
    AngularFireModule.initializeApp(firebaseConfig)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
