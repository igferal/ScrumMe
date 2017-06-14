import { FirebaseListObservable } from 'angularfire2/database';
import { TaskService } from './../../../services/database/task.service';
import { ColumnService } from './../../../services/database/column.service';
import { PostIt } from './../../../model/post.it';
import { ChartComponentParent } from './../chart.parent.component';
import { ActivatedRoute, Params } from '@angular/router';
import { DestroySubscribers } from '../../../util/unsuscribe.decorator';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  moduleId: 'task-chart',
  selector: 'task-chart',
  templateUrl: './task.chart.component.html',
  styleUrls: ['./task.chart.component.scss'],
  providers: []

})
@DestroySubscribers()
export class TaskChartComponent extends ChartComponentParent implements OnInit {



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
      backgroundColor: 'rgba(33, 124, 163,1)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(33, 124, 163,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(33, 124, 163,0.8)'
    },
    {
      backgroundColor: 'rgba(226, 153, 48,1)',
      borderColor: 'rgba(226, 153, 48,1)',
      pointBackgroundColor: 'rgba(226, 153, 48,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(226, 153, 48,0.8)',
    }];
  }

  public setChartType(){
    this.ChartType  = 'bar';
  }

  public async ngOnInit() {
    this.createChart();
    this.inicializateRoute();
    this.taskService.getMyTasks(this.board).subscribe((element: PostIt[]) => {
      this.fillChart(element);
    });
    

  }

  public inicializateRoute() {
    this.subscribers.routerSubscription = this.route.params
      .switchMap((params: Params) => this.board = params['id'])
      .subscribe((board) => {
      });


  }


}