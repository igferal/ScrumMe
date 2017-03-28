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
  moduleId: 'burndown',
  selector: 'burndown',
  templateUrl: 'burndown.component.html',
  styleUrls: ['./burndown.component.scss'],
  providers: [ColumnService, TaskService]

})
@DestroySubscribers()
export class BurndownComponent implements OnInit {


  private board: string;
  private subscribers: any = {};
  private estimados: Array<number> = new Array<number>();
  private realizadas: Array<number> = new Array<number>();
  public lineChartLabels = [];
  public isDataAvailable: boolean = false;
  public lineChartData: Array<any> = [
    { data: this.estimados, label: 'Estimadas' },
    { data: this.realizadas, label: 'Trabajadas' }];


  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Array<any> = [
    { 
      backgroundColor: 'rgba(33, 124, 163,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(33, 124, 163,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(33, 124, 163,0.8)'
    },
    { 
      backgroundColor: 'rgba(226, 153, 48,0.4)',
      borderColor: 'rgba(226, 153, 48,1)',
      pointBackgroundColor: 'rgba(226, 153, 48,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(226, 153, 48,0.8)',
    }

  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(private route: ActivatedRoute, private taskService: TaskService,
    private columnService: ColumnService) {

  }


  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public async ngOnInit() {
    let labels: Array<string> = new Array<string>();
    this.inicializateRoute();
    let postIts: PostIt[];
    this.taskService.getTasksOrderedByEstimatedTime(this.board).subscribe((element: PostIt[]) => {
      this.restoreChart();
      console.log(element);
      postIts = element;
      postIts.sort((taskA, taskB) => (taskB.horas - taskA.horas));
      postIts.forEach((postIt: PostIt) => {
        this.estimados.push(postIt.horas);
        this.realizadas.push(postIt.workedHours);
        this.lineChartLabels.push(postIt.titulo);
      });

      this.putData();
      this.isDataAvailable = true;
    });

  }

  private restoreChart() {

    this.estimados = new Array<number>();
    this.lineChartLabels = new Array<string>();
    this.realizadas = new Array<number>();
    this.isDataAvailable = false;

  }

  private putData() {
    this.lineChartData = [
      { data: this.estimados, label: 'Estimadas' },
      { data: this.realizadas, label: 'Trabajadas' }];

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