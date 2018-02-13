import { Component, OnInit } from '@angular/core';
import { ChartService } from './../chart.service';
declare var d3:any;
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
     //this.drawBarChart();
     //this.drawPieChart();
    this.d3Bar();
    this.d3Pie();
     
  }  

  d3Pie(){
    let pieData = [2, 4, 8, 10];
    
        let svg = d3.select("svg"),
            width = svg.attr("width"),
            height = svg.attr("height"),
            radius = Math.min(width, height) / 2,
            g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
        let color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
    
        // Generate the pie
        let pie = d3.pie();
    
        // Generate the arcs
        let arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius);
    
        //Generate groups
        let arcs = g.selectAll("arc")
                    .data(pie(pieData))
                    .enter()
                    .append("g")
                    .attr("class", "arc")
    
        //Draw arc paths
        arcs.append("path")
            .attr("fill", function(d, i) {
                return color(i);
            })
            .attr("d", arc);
  }
  d3Bar(){
      // set the dimensions of the canvas
      let dataArray = [23, 13, 21, 14, 37, 15, 18, 34, 30];
      
      // Create letiable for the SVG
      let svg = d3.select("body").append("svg")
                .attr("height","400")
                .attr("width","100%");
      
      // Select, append to SVG, and add attributes to rectangles for bar chart
      svg.selectAll("rect")
          .data(dataArray)
          .enter().append("rect")
                .attr("fill", "#0080FF")
                .attr("height", function(d, i) {return (d * 10)})
                .attr("width","40")
                .attr("x", function(d, i) {return (i * 60) + 25})
                .attr("y", function(d, i) {return 400 - (d * 10)});
      
      // Select, append to SVG, and add attributes to text
      svg.selectAll("text")
          .data(dataArray)
          .enter().append("text")
          .text(function(d) {return d})
                 .attr("class", "text")
                 .attr("x", function(d, i) {return (i * 60) + 36})
                 .attr("y", function(d, i) {return 415 - (d * 10)});
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
