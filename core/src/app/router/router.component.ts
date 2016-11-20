import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from '../components/create.task.component/create.task.component';
import { BoardComponent } from '../components/board.component/board.component';
import { LoginComponent } from '../components/login.component/login.component';
import { LandingComponent } from '../components/landing.component/landing.component';
import { SignUpComponent } from '../components/signup.component/signup.component';
import { AppComponent } from '../components/app.component/app.component';
import { UserDashboardComponent } from '../components/user.dashboard.component/user.dashboard.component';
import { FirebaseAuthentication } from '../services/authentication/firebase.authentication'

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'board/:id', component: BoardComponent,
    canActivate: [FirebaseAuthentication]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'landing', component: LandingComponent },
  {
    path: 'dashboard', component: UserDashboardComponent,
    canActivate: [FirebaseAuthentication]
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [FirebaseAuthentication]
})
export class AppRoutingModule { }
