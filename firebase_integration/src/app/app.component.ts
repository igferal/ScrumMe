import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  items: FirebaseListObservable<any[]>;
  database : FirebaseObjectObservable<any>;
  name : string;


  constructor(af: AngularFire) {
    console.log("**********" + "*******************"); 
    this.items = af.database.list('/items');
    this.database = af.database.object("/items");
  }

  save(parameter:string ,newName: string) {
    this.name =parameter;
    
    console.log(this.name + " : " + newName);
    var json = { newName : newName};
    this.database.update(json);
  }



  title = 'Lista de medicamentos';
}
