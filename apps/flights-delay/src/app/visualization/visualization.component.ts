import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { View } from 'vega';

declare let vega: any;

@Component({
  selector: 'flight-delays-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  view: View | undefined;

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
    this.http.get('../assets/visualization-config.json').subscribe(spec => this.vegaInit(spec));
  }

  public vegaInit(spec: any): any {
    this.view = new vega.View(vega.parse(spec))
      .renderer('svg')
      .initialize('#chart')
      .width(400)
      .height(200)
      .hover()
      .run();
  }

}
