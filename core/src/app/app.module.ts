import { ColumnComponent } from './components/board.component/column.component/column.component';
import { NgModule } from '@angular/core';
import { CreateBoardComponent } from './components/user.dashboard.component/create.board.component/create.board.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './components/app.component/app.component';
import { AppRoutingModule } from './router/router.component';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { CreateTaskComponent } from './components/create.task.component/create.task.component';
import { BoardComponent } from './components/board.component/board.component';
import { SignUpComponent } from './components/signup.component/signup.component';
import { LoginComponent } from './components/login.component/login.component';
import { UserDashboardComponent } from './components/user.dashboard.component/user.dashboard.component';
import { LandingComponent } from './components/landing.component/landing.component';
import { DragulaModule, DragulaService } from '../../node_modules/ng2-dragula/ng2-dragula';
import { NoteComponent } from './components/board.component/note.component/note.component';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';





export const firebaseConfig = {
    apiKey: 'AIzaSyBXNhwkOT_iu_9HIktEw78YGCydAjs6RQ0',
    authDomain: 'angularintegration-3b520.firebaseapp.com',
    databaseURL: 'https://angularintegration-3b520.firebaseio.com',
    storageBucket: 'angularintegration-3b520.appspot.com',
    messagingSenderId: '87154413034'
};

const myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
}

@NgModule({
    declarations: [
        AppComponent,
        CreateTaskComponent,
        BoardComponent,
        LoginComponent,
        SignUpComponent,
        LandingComponent,
        NoteComponent,
        UserDashboardComponent,
        CreateBoardComponent,
        ColumnComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DragulaModule,
        AppRoutingModule,
        AlertModule,
        ModalModule,
        AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
