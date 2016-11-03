import { Component , OnInit} from '@angular/core';
import { PostIt} from './PostIt';
import { ItemService } from './item.service';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ItemService],
})
export class AppComponent  implements OnInit{

   items : FirebaseListObservable<PostIt[]>;

    constructor(public itemService: ItemService) {


    }


ngOnInit(){

    this.items =  this.itemService.getAll();

}

  save(contenido:string,programador:string , horas: number) {
    let postIt = new PostIt(contenido,programador,horas);
    this.itemService.save(postIt);

  }

  title = 'Lista de tareas';
}
