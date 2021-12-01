import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { View } from 'vega';

declare let vega: any;

@Component({
  selector: 'flight-delays-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  view: View | undefined;

  @Input() set chartState (value: unknown) {
     this.setState(value)
  }

  @Input() set airports(values: any[]){
    if (!this.view) {
        return;
    }
    this.view.remove('airports', this.view.data('table')).run();
    this.view.insert('airports', values).run();
  }

  @Output() chartSelection = new EventEmitter();

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.parseChartSpec();
  }

  private parseChartSpec(): void {
    this.http.get('../assets/map-visualization.json').subscribe(spec => this.vegaInit(spec));
  }

  private vegaInit(spec: any): void {
    this.view = new vega.View(vega.parse(spec))
      .renderer('svg')
      .initialize('#chart')
      .width(900)
      .height(560)
      .hover()
      .run();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.view?.addEventListener('click', (event, item: any) => {
         this.chartSelection.emit(item.datum);
      });
  }

  private setState(signals: unknown): void {
    this.view?.setState({ signals });
    this.view?.runAsync();
  }


}
