import {Medicamento} from './medicamento';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {forEach} from "@angular/router/src/utils/collection";
import {of} from "../../Observable";


@Injectable()
export class ItemService {
  items: FirebaseListObservable<Medicamento[]>;
  database: FirebaseObjectObservable<any>;


  constructor(af: AngularFire) {
    this.items = af.database.list('/items');
    this.database = af.database.object("/items");

  }

  getAll(): FirebaseListObservable<Medicamento> {

    return this.items;

  }

  get Database() : FirebaseObjectObservable<any>{

    return this.database;
  }




}
