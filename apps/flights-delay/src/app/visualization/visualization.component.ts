import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColDef, GridOptions } from 'ag-grid-community';
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
    { field: 'delay', headerName: 'Delay',  width: 200, enableRowGroup: true, type: 'number', filter: 'number', aggFunc: 'avg', resizable: true, sortable: true},
    { field: 'covid', headerName: 'Covid #', width: 100, enableRowGroup: true, type: 'number', filter: 'number', aggFunc: 'avg', resizable: true, sortable: true},
    { field: 'carrier', headerName: 'Carrier', width: 200, enableRowGroup: true, type: 'text', filter: 'agSetColumnFilter', resizable: true, sortable: true}
];  

  gridOptions: GridOptions = {
    rowGroupPanelShow: 'always',
    sideBar: 'columns',
  };


rowData: {from: string, to: string, covid: number, delay: number, carrier: string}[] = [];

  // Setup graph filters controls
  fromAirport = new FormControl();
  toAirport = new FormControl();

  // Setup graph filters datasource
  fromAirportList: string[] = [];
  toAirportList: string[] = [];

  airlines = ['Alaska Airlines Inc.', 'Allegiant Air', 'American Airlines Inc.', 'Delta Air Lines Inc.', 'Frontier Airlines Inc.', 'Hawaiian Airlines Inc.', 
      'JetBlue Airways', 'Southwest Airlines Co.', 'Spirit Air Lines', 'United Air Lines Inc.'];

  flights: {from: string, to: string, covid: string, delay: number, carrier: string }[] = [];

  form = new FormGroup({
    hour: new FormControl(),
    day: new FormControl(),
    month: new FormControl()
  })

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
       console.log('AIRPORTS: ', airports);
       const fromAirport = airports?.filter(a => a.iata === newValue)[0];
       const toAirport = this.toAirport.value ? airports?.filter(a => a.iata === this.toAirport.value)[0] : null;
       
       const newState = toAirport ? { from: fromAirport, to: toAirport } : {from: fromAirport };
       this.setState(newState);

       if (toAirport) {
        const rows: { from: string; to: string; delay: number; covid: number; carrier: string}[] = [];
        const flightData = this.flights.filter(f => f.from =  this.fromAirport.value && f.to == newValue);
        flightData.forEach(d => rows.push({from: fromAirport.name, to: toAirport.name, delay: +d.delay, covid: +d.covid, carrier: d.carrier }));
        this.rowData = rows;
       }
    });

    this.toAirport.valueChanges.subscribe(newValue => {
      const airports = this.view?.data('airports');

      const fromAirport = airports?.filter(a => a.iata === this.fromAirport.value)[0];
      const toAirport = airports?.filter(a => a.iata === newValue)[0];
      
      const newState = {from: fromAirport, to: toAirport };
      this.setState(newState);

      const rows: { from: string; to: string; delay: number; covid: number; carrier: string }[] = [];
      const flightData = this.flights.filter(f => f.from =  this.fromAirport.value && f.to == newValue);
      flightData.forEach(d => rows.push({from: fromAirport.name, to: toAirport.name, delay: +d.delay, covid: +d.covid, carrier: d.carrier }));
      this.rowData = rows;
    });
  }

  private parseData(): void {
    this.http.get('../assets/map-visualization.json').subscribe(spec => this.vegaInit(spec));
    this.http.get('../assets/data/flights-airport.csv',  {responseType: "text"}).subscribe(data => {
      const list = data.split("\n");
      const fromSet = new Set<string>();
      const toSet = new Set<string>();
      list.forEach( flight => {
            const values = flight.split(",");
            fromSet.add(values[0]);
            toSet.add(values[1]);
            this.flights.push({ from: values[0], to: values[1], covid: values[2], delay: +values[3], carrier: values[4]})
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

  predictDelay() {
    // TODO: Connect with model
  }

}
