export interface Database {



    getCollection(name: string);

    save(item: any, collection: string);

    delete(key: string, collection: string);

    findById(key:string,collection:string);



}