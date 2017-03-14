import { Component } from '@angular/core';

@Component({
    moduleId: 'burndown',
    selector: 'burndown',
    templateUrl: 'burndown.component.html',
    styleUrls: ['./burndown.component.scss'],
})
export class BurndownComponent {

    data: any;

    msgs: any[];

    constructor() {
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        }
    }

     selectData(event) {
         console.log("datos")
    }


}