export interface Database {



    getCollection(name: string);

    saveTask(item: any, collection: string);

    delete(key: string, collection: string);

    findById(board: string, key: string, collection: string);

    createUser(user: any);

    addToOtherBag(board: string, postItId: string, fromCollection: string, toCollection: string, programmer: string): void



}