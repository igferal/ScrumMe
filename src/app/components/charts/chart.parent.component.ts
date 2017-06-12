import { PostIt } from './../../model/post.it';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ViewChild } from '@angular/core';
export abstract class ChartComponentParent {

    public estimados: Array<number> = new Array<number>();
    public realizadas: Array<number> = new Array<number>();
    public ChartLabels = [];
    public isDataAvailable: boolean = false;
    public ChartType: string = '';
    public ChartLegend: boolean = true;
    public ChartColors: Array<any>;
    public ChartData: Array<any>;
    public board: string;
    public subscribers: any = {};
    @ViewChild(BaseChartDirective) 
    public myChart: BaseChartDirective;
    public ChartOptions: any = {
        responsive: true,
        maintainAspectRatio: true
    };


    public abstract setChartType(type: string);

    public abstract chartClicked(e: any): void;

    public abstract chartHovered(e: any): void;

    public abstract setColors(data: Array<any>);

    public abstract setData(data: Array<any>);

    public restoreChart() {

        this.estimados = new Array<number>();
        this.ChartLabels = new Array<string>();
        this.realizadas = new Array<number>();
        this.isDataAvailable = false;

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

            if (this.myChart.chart) {
                this.myChart.chart.config.data.labels = this.ChartLabels;
            }

        }
        this.putData();
        this.isDataAvailable = true;

    }

}