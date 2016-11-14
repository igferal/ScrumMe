export class User {



    private _name: string;
    private _surmame: string;
    private _uid: string;
    private _email: string;

    constructor(name: string, surname: string, email: string, uid: string) {

        this._name = name;
        this._surmame = surname;
        this._email = email;
        this._uid = uid;

    }

    get name(): string {

        return this._name;
    }

    get surname(): string {

        return this._surmame;
    }

    get email(): string {

        return this._email;
    }

    get uid(): string {

        return this._uid;
    }


}