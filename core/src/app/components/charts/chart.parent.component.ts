import { PostIt } from './../../model/post.it';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ViewChild } from '@angular/core';
export class ChartComponentParent {

    public estimados: Array<number> = new Array<number>();
    public realizadas: Array<number> = new Array<number>();
    public ChartData: Array<any> = [
        { data: this.estimados, label: 'Estimadas' },
        { data: this.realizadas, label: 'Trabajadas' }];
    public ChartLabels = [];
    public isDataAvailable: boolean = false;
    @ViewChild(BaseChartDirective) myChart: BaseChartDirective;
   
    public ChartOptions: any = {
        responsive: true,
        maintainAspectRatio: true
    };
    public ChartLegend: boolean = true;


    public restoreChart() {

        this.estimados = new Array<number>();
        this.ChartLabels = new Array<string>();
        this.realizadas = new Array<number>();
        this.isDataAvailable = false;
        //this.myChart.chart.config.data.labels = [];


    }

    public putData() {
        this.ChartData = [
            { data: this.estimados, label: 'Estimadas' },
            { data: this.realizadas, label: 'Trabajadas' }];
    }

    public fillChart(element: any) {
        this.restoreChart();
        element.sort((taskA, taskB) => (taskB.horas - taskA.horas));
        element.forEach((postIt: PostIt) => {
            this.estimados.push(postIt.horas);
            this.realizadas.push(postIt.workedHours);
            this.ChartLabels.push(postIt.titulo);
        })
        if (this.myChart) {
            this.myChart.chart.config.data.labels = this.ChartLabels;
        }
        this.putData();
        this.isDataAvailable = true;

    }

}