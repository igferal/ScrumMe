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

        console.log(`Voy a buscar ${key} : ${collection}`)
        var element: any;

        this.af.database.object(collection + "/" + key).subscribe((item) => {
            console.log(item + " soy el item en la bd")
            element = item;
        });
        console.log("voy a cambiar a un postit " + element)

        if (collection === "/todo") {
            return new PostIt(element._contenido, this.getCurrentDeveloper(), element._horas, element.$key)
        }

        return new PostIt(element._contenido, element._programador, element._horas, element.$key);
    }

    createUser(user: User) {

        this.af.database.list("/users").push(user);

    }

    getCurrentDeveloper(): string {

        let currentUser;
        this.af.auth.subscribe((user) => {
            currentUser = user.uid;
        })

        console.log("currentUser " + currentUser)

        let currentDeveloperName = this.af.database.list('/users', {
            query: {
                equalTo: currentUser,
            }
        }).subscribe((name) =>
            console.log(name));
        console.log("nuevo name" + currentDeveloperName)

        return "";
    }

}
