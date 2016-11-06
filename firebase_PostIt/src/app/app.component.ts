import { Component } from '@angular/core';
import {   PostIt  } from './post.it';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title : string;

  items: FirebaseListObservable<any>;
  constructor(af: AngularFire) {
    this.items = af.database.list('/items');
    this.title = "Lista de tareas";
  }
  addItem(contenido: string,programador: string ,horas :number) {

    var postIt = new PostIt(contenido,programador,horas);
    this.items.push(postIt);  

}
  updateItem(key: string, newText: string) {
    this.items.update(key, { text: newText });
  }
  deleteItem(key: string) {    
    this.items.remove(key); 
  }
  deleteEverything() {
    this.items.remove();
  }
}