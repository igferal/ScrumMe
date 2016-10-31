import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2';
import { Medicamento} from './medicamento';


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
    this.items = af.database.list('/items');
    this.database = af.database.object("/items");
    
  }


  save(nombre:string , dosis: number) {
    let medicamento = new Medicamento(nombre,dosis);
    this.items.push(medicamento);
  }



  title = 'Lista de medicamentos';
}
