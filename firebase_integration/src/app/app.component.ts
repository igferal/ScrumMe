import { Component , OnInit} from '@angular/core';
import { PostIt} from './PostIt';
import { FirebaseService } from './item.service';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirebaseService],
})
export class AppComponent  implements OnInit{

   items : FirebaseListObservable<PostIt[]>;

    constructor(public firebaseService: FirebaseService) {


    }


  login() {
    this.firebaseService.login();
  }

  overrideLogin() {
    this.firebaseService.overrideLogin();
  }


ngOnInit(){

    this.items =  this.firebaseService.getAll();

}

  save(contenido:string,programador:string , horas: number) {
    let postIt = new PostIt(contenido,programador,horas);
    this.firebaseService.save(postIt);

  }

  title = 'Lista de tareas';
}
