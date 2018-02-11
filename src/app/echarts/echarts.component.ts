import { Component, OnInit } from '@angular/core';
import { ChartService } from './../chart.service';
@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.css']
})
export class EchartsComponent implements OnInit {

  constructor(private _chartService:ChartService) { }

  pieOptions:any;
  barOptions:any;
  pieData:any;
  barData:any;
  ngOnInit() {
     this.drawBarChart();
     this.drawPieChart();
  }  

  drawPieChart(){
    this._chartService.fetchPieData().subscribe(data=>{
      console.log(data);
      this.pieData = data;
      this.pieOptions = {
      
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Google','Amazon','Microsoft','SpaceX','Tinder']
        },
        series : [
            {
                name: 'Website',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:this.pieData
                
            }
        ]
    };
    
    })
  }

  drawBarChart(){
    this._chartService.fetchBarData().subscribe(data=>{
      this.barData = data;
      this.barOptions = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
          data: this.barData,
            type: 'bar'
        }]
    };
    })
  }
}
