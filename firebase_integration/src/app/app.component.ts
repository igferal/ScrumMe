import { Component } from '@angular/core';
import { Medicamento} from './medicamento';
import { ItemService } from './item.service';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2';
import {Observable} from 'rxjs/Observable';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ItemService],
})
export class AppComponent {

   items : FirebaseListObservable<Medicamento>;

    constructor(public itemService: ItemService) {

    this.itemService = itemService;
      this.items = itemService.getAll();

    }



  save(nombre:string , dosis: number) {
    let medicamento = new Medicamento(nombre,dosis);
    this.itemService.database.push(medicamento);
  }

  title = 'Lista de medicamentos';
}
