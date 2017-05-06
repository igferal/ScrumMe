export class Issue {

    public assignee: string;
    public title: string;
    public body: string;

    constructor(res: any) {
        this.fromJSON(res);
    }

    public fromJSON(res: any) {
        if (res.assignees.length >0) {
            this.assignee = res.assignees[0].login;
        }
        this.title = res.title;
        this.body = res.body;
    }

}