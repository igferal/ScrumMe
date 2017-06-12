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


  public setChartType(type: string) {
    this.ChartType = type;
  }

  public setData(data: Array<any>) {
    this.ChartData = data;
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public setColors(data: Array<any>) {
    this.ChartColors = data;
  }


  public async ngOnInit() {

    this.inicializateRoute();
    this.taskService.getMyTask(this.board).subscribe((element: PostIt[]) => {
      this.fillChart(element);
    });
    this.setChartType('bar');
    this.setColors([{
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
    }]);


  }


  public inicializateRoute() {
    this.subscribers.routerSubscription = this.route.params
      .switchMap((params: Params) => this.board = params['id'])
      .subscribe((board) => {
      });


  }


}