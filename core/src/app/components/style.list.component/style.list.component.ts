import { PostIt } from './../../model/post.it';
import { Component } from '@angular/core';

@Component({
  selector: 'styles',
  templateUrl: './style.list.component.html',
  styleUrls: ['./style.list.component.scss'],
})
export class StyleListComponent {

  msgs = [];
  p1: PostIt;
  p2: PostIt;
  p3: PostIt;


  constructor() {
    this.msgs.push({ severity: 'error', summary: 'Error!', detail: 'Soy una alerta' });
    this.p1 = new PostIt('titulo', 'contenido', 'dev', 10, '');
    this.p2 = new PostIt('titulo', 'contenido', '', 10, '');
    this.p2.workedHours = 5;
    this.p3 = new PostIt('titulo', 'contenido', '', 10, '');
    this.p3.closed = true;
  }

}
