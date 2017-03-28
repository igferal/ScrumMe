import { read } from 'fs';
import { element } from 'protractor';
import { FirebaseListObservable } from 'angularfire2';
import { delay } from 'rxjs/operator/delay';
import { PostIt } from './../../model/post.it';
import { ColumnService } from './../../services/database/column.service';
import { TaskService } from './../../services/database/task.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DestroySubscribers } from '../../util/unsuscribe.decorator';
import { Component, OnInit } from '@angular/core';
import { UIChart } from 'primeng/primeng';

@Component({
  moduleId: 'task-chart',
  selector: 'task-chart',
  templateUrl: './task.chart.component.html',
  styleUrls: ['./task.chart.component.scss'],
  providers: [ColumnService, TaskService]

})
@DestroySubscribers()
export class TaskChartComponent implements OnInit {

  private columns: Array<any> = [];
  private board: string;
  private subscribers: any = {};
  private estimados: Array<number> = new Array<number>();
  private realizadas: Array<number> = new Array<number>();
  public barChartLabels = [];
  public isDataAvailable: boolean = false;



  constructor(private route: ActivatedRoute, private taskService: TaskService,
    private columnService: ColumnService) {

  }

  // barChart
  public barChartData: Array<any> = [
    { data: this.estimados, label: 'Estimadas' },
    { data: this.realizadas, label: 'Trabajadas' }];


  public barChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public barChartColors: Array<any> = [
    { // secondary
      backgroundColor: 'rgba(33, 124, 163,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(33, 124, 163,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(33, 124, 163,0.8)'
    },
    { // main
      backgroundColor: 'rgba(226, 153, 48,0.4)',
      borderColor: 'rgba(226, 153, 48,1)',
      pointBackgroundColor: 'rgba(226, 153, 48,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(226, 153, 48,0.8)',
    }

  ];
  public barChartLegend: boolean = true;
  public barChartType: string = 'bar';


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public async ngOnInit() {

    this.inicializateRoute();
    let postIts: PostIt[];
    this.taskService.getMyTask(this.board).subscribe((element: PostIt[]) => {

      postIts = element;
      postIts.sort((taskA, taskB) => (taskB.horas - taskA.horas));
      postIts.forEach((postIt: PostIt) => {
        console.log(postIt);
        this.estimados.push(postIt.horas);
        this.realizadas.push(postIt.workedHours);
        this.barChartLabels.push(postIt.titulo);
      })
      this.isDataAvailable = true;
    });




  }

  /**
 * Metodo que nos obtiene el id del tablero actual a traves de la url
 */
  private inicializateRoute() {
    this.subscribers.routerSubscription = this.route.params
      .switchMap((params: Params) => this.board = params['id'])
      .subscribe((board) => {

      });

  }


}