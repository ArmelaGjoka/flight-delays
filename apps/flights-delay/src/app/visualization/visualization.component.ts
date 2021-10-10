import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { View } from 'vega';

declare let vega: any;

@Component({
  selector: 'flight-delays-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  view: View | undefined;

  // Setup graph filters controls
  fromAirport = new FormControl();
  toAirport = new FormControl();

  // Setup graph filters datasource
  fromAirportList: string[] = ['A1', 'A2', 'A3'];
  toAirportList: string[] = ['A1', 'A2', 'A3'];

  @Input() 
    set data(values: any[]){
       if (!this.view) {
           return;
       }
        this.view.remove('table', this.view.data('table')).run();
        this.view.insert('table', values).run();
    }


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('../assets/map-visualization.json').subscribe(spec => this.vegaInit(spec));
  }

  public vegaInit(spec: any): any {
    this.view = new vega.View(vega.parse(spec))
      .renderer('svg')
      .initialize('#chart')
      .width(900)
      .height(560)
      .hover()
      .run();
  }

}
