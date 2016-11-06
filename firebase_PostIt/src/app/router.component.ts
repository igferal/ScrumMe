import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent }   from './form.component';
import { ListComponent }   from './list.component';
import { AppComponent }      from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list',  component: ListComponent },
  { path: 'form', component: FormComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
