import {PostIt} from './PostIt';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {forEach} from "@angular/router/src/utils/collection";


@Injectable()
export class ItemService {


  constructor(public af: AngularFire) {
  


  }

  getAll(): FirebaseListObservable<PostIt[]> {

    return this.af.database.list('/items');

  }

 

  save(medicamento : PostIt){

    
    this.af.database.list('/items').push(medicamento);

  }


}
