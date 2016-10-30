import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Hero}                      from './hero';
import { HeroService } from './hero.service';


@Component({
  selector: 'my-hero-detail',
  template: `
    <div *ngIf="hero">
      <h2>{{hero.name}} details!</h2>
      <div>
        <label>id: </label>{{hero.id}}
      </div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
      </div>
    </div>
  `
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
constructor(
  private heroService: HeroService,
  private route: ActivatedRoute,
  private location: Location
) {}

getHero(id: number): Hero {
  return new Hero(2,"pepe el hero")
}

goBack(): void {
  this.location.back();
}


ngOnInit(): void {
  this.route.params.forEach((params: Params) => {
    let id = +params['id'];
   
  });

}}
