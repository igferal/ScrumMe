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

  private columns: Array<any> = [];
  private board: string;
  private subscribers: any = {};
  private estimados: Array<number> = new Array<number>();
  private realizadas: Array<number> = new Array<number>();


  constructor(private route: ActivatedRoute, private taskService: TaskService,
    private columnService: ColumnService) {

  }

  // lineChart
  public lineChartData: Array<any> = [
    { data: this.estimados, label: 'Estimadas' },
    { data: this.realizadas, label: 'Trabajadas' }];


  public lineChartLabels = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
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
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public ngOnInit() {

    this.inicializateRoute();
    console.log(this.board);
    this.subscribers.subscription = this.columnService.getColumns(this.board).subscribe(
      (items) => {
        this.columns = items;
        this.columns.forEach((column) => {
          console.log(column.$key);
          this.taskService.getTasksOrderedByEstimatedTime(column.$key, this.board).subscribe(
            (tarea: Array<PostIt>) => {
              tarea.forEach((tarea: PostIt) => {
                this.estimados.push(tarea.horas);
                this.realizadas.push(tarea.workedHours);
                this.lineChartLabels.push(tarea.contenido);
              })
            })
          console.log(this.estimados.reverse());
          this.estimados = this.estimados.reverse();
        })
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