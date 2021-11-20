import { Component, OnInit } from '@angular/core';
import { View } from 'vega';


declare let vega: any;

@Component({
  selector: 'flight-delays-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  view: View | undefined;

  constructor() { 
    console.log('TODO CHART');
  }

  ngOnInit(): void {
    console.log('TODO CHART');
  }

}
