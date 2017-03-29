import { read } from 'fs';
import { element } from 'protractor';
import { FirebaseListObservable } from 'angularfire2';
import { delay } from 'rxjs/operator/delay';
import { PostIt } from './../../model/post.it';
import { ColumnService } from './../../services/database/column.service';
import { TaskService } from './../../services/database/task.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DestroySubscribers } from '../../util/unsuscribe.decorator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/primeng';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';


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
    maintainAspectRatio: true
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
  @ViewChild(BaseChartDirective) myChart: BaseChartDirective;


  constructor(private route: ActivatedRoute, private taskService: TaskService,
    private columnService: ColumnService) {

  }


  public chartClicked(e: any): void {
    console.log('COSA');
    console.log(this.myChart);

  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public async ngOnInit() {

    this.inicializateRoute();
    let postIts: PostIt[];
    this.taskService.getTasksOrderedByEstimatedTime(this.board).subscribe((element: PostIt[]) => {
      this.restoreChart();
      element.sort((taskA, taskB) => (taskB.horas - taskA.horas));
      element.forEach((postIt: PostIt) => {
        this.estimados.push(postIt.horas);
        this.realizadas.push(postIt.workedHours);
        this.lineChartLabels.push(postIt.titulo);

      });
      if (this.myChart) {
        this.myChart.chart.config.data.labels = this.lineChartLabels;
      }

      this.putData();
      this.isDataAvailable = true;
    });

  }

  private restoreChart() {

    this.estimados = new Array<number>();
    this.lineChartLabels = new Array<string>();
    this.realizadas = new Array<number>();
    this.isDataAvailable = false;
    //this.myChart.chart.config.data.labels = [];


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