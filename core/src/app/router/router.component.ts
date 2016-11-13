import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from '../components/form.component/form.component';
import { BoardComponent } from '../components/board.component/board.component';
import { LoginComponent } from '../components/login.component/login.component';

import { AppComponent } from '../components/app.component/app.component';

const routes: Routes = [
  { path: '', redirectTo: 'board', pathMatch: 'full' },
  { path: 'board', component: BoardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'form', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
