import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {


    heroes: Hero[] = [];

    constructor(af: AngularFire) {

    }
    ngOnInit(): void {

    }

    gotoDetail(hero: Hero): void { /* not implemented yet */ }
}