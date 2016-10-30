import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent } from './heroes.component';
import { HeroService } from './hero.service';
import { DashboardComponent } from './dashboard.component'
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule, RouterModule.forRoot([
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