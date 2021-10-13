import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { View } from 'vega';

declare let vega: any;

@Component({
  selector: 'flight-delays-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  view: View | undefined;

  columnDefs: ColDef[] = [
    { field: 'from' },
    { field: 'to' },
    { field: 'delay'}
];

rowData = [
    { from: 'Toyota', to: 'Celica', delay: 35000 },
];

  // Setup graph filters controls
  fromAirport = new FormControl();
  toAirport = new FormControl();

  // Setup graph filters datasource
  fromAirportList: string[] = [];
  toAirportList: string[] = [];

  set airports(values: any[]){
      if (!this.view) {
          return;
      }
      this.view.remove('airports', this.view.data('table')).run();
      this.view.insert('airports', values).run();
  }  

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.parseData();

    this.fromAirport.valueChanges.subscribe(newValue => {
       const airports = this.view?.data('airports');

       const fromAirport = airports?.filter(a => a.iata === newValue)[0];
       const toAirport = this.toAirport.value ? airports?.filter(a => a.iata === this.toAirport.value)[0] : null;
       
       const newState = toAirport ? { from: fromAirport, to: toAirport } : {from: fromAirport };
       this.setState(newState);
    });

    this.toAirport.valueChanges.subscribe(newValue => {
      const airports = this.view?.data('airports');

      const fromAirport = airports?.filter(a => a.iata === this.fromAirport.value)[0];
      const toAirport = airports?.filter(a => a.iata === newValue)[0];
      
      const newState = {from: fromAirport, to: toAirport };
      this.setState(newState);

      console.log('STATE: ', this.view?.getState().signals);
    });
  }

  private parseData() {
    this.http.get('../assets/map-visualization.json').subscribe(spec => this.vegaInit(spec));
    this.http.get('../assets/data/flights-airport.csv',  {responseType: "text"}).subscribe(data => {
      const list = data.split("\n");
      const fromSet = new Set<string>();
      const toSet = new Set<string>();
      list.forEach( flight => {
            const values = flight.split(",");
            fromSet.add(values[0]);
            toSet.add(values[1]);
        });
      this.fromAirportList = Array.from(fromSet.values());
      this.toAirportList = Array.from(toSet.values());
    });
  }

  private setState(signals: unknown): void {
    this.view?.setState({ signals });
    this.view?.runAsync();
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
