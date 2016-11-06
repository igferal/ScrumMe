import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './router.component';
import { AngularFireModule } from 'angularfire2';
import { FormComponent } from './form.component';
import { ListComponent } from './list.component';



export const firebaseConfig = {
  apiKey: "AIzaSyBXNhwkOT_iu_9HIktEw78YGCydAjs6RQ0",
  authDomain: "angularintegration-3b520.firebaseapp.com",
  databaseURL: "https://angularintegration-3b520.firebaseio.com",
  storageBucket: "angularintegration-3b520.appspot.com",
  messagingSenderId: "87154413034"
};

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
