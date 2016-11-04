import { PostIt } from './PostIt';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable ,AuthProviders, AuthMethods } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forEach } from "@angular/router/src/utils/collection";


@Injectable()
export class FirebaseService {


  constructor(public af: AngularFire) {



  }

  getAll(): FirebaseListObservable<PostIt[]> {

    return this.af.database.list('/items');

  }

   login() {
    this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup,
    });
  }
  overrideLogin() {
    this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous,
    });    

  save(medicamento: PostIt) {


    this.af.database.list('/items').push(medicamento);

  }


}
