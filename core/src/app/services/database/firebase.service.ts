import { Injectable } from '@angular/core';
import { Database } from './IDatabase';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { PostIt } from '../../model/post.it';
import { User } from '../../model/user';


@Injectable()
export class FirebaseService implements Database {



    constructor(private af: AngularFire) {


    }

    getCollection(name: string): FirebaseListObservable<any> {

        return this.af.database.list(name);

    }

    save(item: PostIt, collection: string) {

        console.log(collection);
        this.af.database.list(collection).push(item);

    }


    delete(key: string, collection: string) {

        this.af.database.list(collection).remove(key);

    }

    findById(key: string, collection: string) {

        console.log(`${key} : ${collection}`)
        var element: any[];

        this.af.database.list(collection + "/" + key).subscribe((item) => {
            element = item;
            console.log(element)
        });


        console.log(element);
        var postit = new PostIt(element[0].$value, element[3].$value, element[1].$value, key);
        console.log(postit)
        return postit;

    }

    createUser(user: User) {

        this.af.database.list("/users").push(user);

    }

}
