import { User } from './../../model/user';
import { Injectable } from '@angular/core';
import { Database } from './IDatabase';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { PostIt } from '../../model/post.it';


@Injectable()
export class FirebaseService implements Database {



    constructor(private af: AngularFire) { }

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

        var element: any;

        this.af.database.object(collection + "/" + key).subscribe((item) => {
            element = item;
        });

        return new PostIt(element._contenido, element._programador, element._horas, element.$key);
    }

    createUser(user: User) {

        this.af.database.object(`/users/${user.uid}`).set(user);

    }

    getCurrentDeveloper(): FirebaseObjectObservable<any> {

        let currentUser;
        this.af.auth.subscribe((user) => {
            currentUser = user.uid;
        })

        console.log("currentUser " + currentUser)

        return this.af.database.object(`users/${currentUser}`);

    }

    public addToOtherBag(postItId: string, fromCollection: string, toCollection: string, programmer: string): void {

        var postit = this.findById(postItId, fromCollection);
        this.addProgrammerLabel(postit, toCollection, programmer);
        this.delete(postItId, fromCollection);
        this.save(postit, toCollection);

    }


    private addProgrammerLabel(postIt: PostIt, toCollection: string, programmer: string) {

        if (toCollection != '/todo') {
            postIt.progamador = programmer;
        }
        else {
            postIt.progamador = "";
        }
    }


}
