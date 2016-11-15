import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from '../components/form.component/form.component';
import { BoardComponent } from '../components/board.component/board.component';
import { LoginComponent } from '../components/login.component/login.component';
import { LandingComponent } from '../components/landing.component/landing.component';
import { SignUpComponent } from '../components/signup.component/signup.component';
import { AppComponent } from '../components/app.component/app.component';
import { UserDashboardComponent } from '../components/user.dashboard.component/user.dashboard.component';
import { AuthenticationGuard } from '../services/authentication/authentication.guard'

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'board', component: BoardComponent,
    canActivate: [AuthenticationGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'form', component: FormComponent,
    canActivate: [AuthenticationGuard]
  },
  { path: 'landing', component: LandingComponent },
  {
    path: 'dashboard', component: UserDashboardComponent,
    canActivate: [AuthenticationGuard]
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [AuthenticationGuard]
})
export class AppRoutingModule { }
