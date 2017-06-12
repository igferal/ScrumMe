import { ChartComponentParent } from './../chart.parent.component';
import { FirebaseListObservable } from 'angularfire2/database';
import { PostIt } from './../../../model/post.it';
import { ColumnService } from './../../../services/database/column.service';
import { TaskService } from './../../../services/database/task.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DestroySubscribers } from '../../../util/unsuscribe.decorator';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  moduleId: 'burndown',
  selector: 'burndown',
  templateUrl: 'burndown.component.html',
  styleUrls: ['./burndown.component.scss'],
  providers: []

})
@DestroySubscribers()
export class BurndownComponent extends ChartComponentParent implements OnInit {


  constructor(public route: ActivatedRoute, public taskService: TaskService,
    public columnService: ColumnService) {
    super();
  }


   public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public setDataLabels(){
    this.ChartData = [
        { data: this.estimados, label: 'Estimadas' },
        { data: this.realizadas, label: 'Trabajadas' }];
  }

  public  setColors(){
    this.ChartColors = [{
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
    }];
  }

  public setChartType(){
    this.ChartType  = 'line';
  }


  public async ngOnInit() {
    this.createChart();
    this.inicializateRoute();
    this.taskService.getTasksOrderedByEstimatedTime(this.board).subscribe((element: PostIt[]) => {
      this.fillChart(element);

    }); 
  }


  /**
 * Metodo que nos obtiene el id del tablero actual a traves de la url
 */
  public inicializateRoute() {
    this.subscribers.routerSubscription = this.route.params
      .switchMap((params: Params) => this.board = params['id'])
      .subscribe((board) => {

      });
  }


}