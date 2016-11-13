import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent }   from './form.component';
import { BoardComponent }   from './board.component';
import { AppComponent }      from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'board', pathMatch: 'full' },
  { path: 'board',  component: BoardComponent },
  { path: 'form', component: FormComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
