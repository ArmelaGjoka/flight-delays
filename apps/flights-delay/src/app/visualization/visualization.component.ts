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
    { field: 'from', colId: 'from', width: 200 },
    { field: 'to', width: 200 },
    { field: 'delay', width: 100},
    { field: 'covid', headerName: 'Covid #', width: 100}
];

rowData: {from: string, to: string, covid: string, delay: string}[] = [];

  // Setup graph filters controls
  fromAirport = new FormControl();
  toAirport = new FormControl();

  // Setup graph filters datasource
  fromAirportList: string[] = [];
  toAirportList: string[] = [];

  flights: {from: string, to: string, covid: string, delay: string }[] = [];

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

       if (toAirport) {
        const rows: { from: string; to: string; delay: string; covid: string; }[] = [];
        const flightData = this.flights.filter(f => f.from =  this.fromAirport.value && f.to == newValue);
        flightData.forEach(d => rows.push({from: fromAirport.name, to: toAirport.name, delay: d.delay, covid: d.covid }));
        this.rowData = rows;
       }
    });

    this.toAirport.valueChanges.subscribe(newValue => {
      const airports = this.view?.data('airports');

      const fromAirport = airports?.filter(a => a.iata === this.fromAirport.value)[0];
      const toAirport = airports?.filter(a => a.iata === newValue)[0];
      
      const newState = {from: fromAirport, to: toAirport };
      this.setState(newState);

      const rows: { from: string; to: string; delay: string; covid: string; }[] = [];
      const flightData = this.flights.filter(f => f.from =  this.fromAirport.value && f.to == newValue);
      flightData.forEach(d => rows.push({from: fromAirport.name, to: toAirport.name, delay: d.delay, covid: d.covid }));
      this.rowData = rows;
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
            this.flights.push({ from: values[0], to: values[1], covid: values[2], delay: values[3]})
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
