import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { View } from 'vega';
import { FROM_AIRPORT_LIST, TO_AIRPORT_LIST } from '../constants/aiports';

declare let vega: any;

@Component({
  selector: 'flight-delays-view-container',
  templateUrl: './view-container.component.html',
  styleUrls: ['./view-container.component.css']
})
export class ViewContainerComponent implements OnInit {

  view: View | undefined;

  fromAirportList = FROM_AIRPORT_LIST;

  toAirportList = TO_AIRPORT_LIST;

  flights: {from: string, to: string, covid: string, delay: number, carrier: string }[] = [];

  set airports(values: any[]){
    if (!this.view) {
        return;
    }
    this.view.remove('airports', this.view.data('table')).run();
    this.view.insert('airports', values).run();
}  

  fromAirport = new FormControl();
  toAirport = new FormControl();

  constructor(
    private http: HttpClient
  ) { 
    console.log('TODO View');
  }

  ngOnInit(): void {
    console.log('TODO View');

    this.parseData();

    this.fromAirport.valueChanges.subscribe(newValue => {
      const airports = this.view?.data('airports');
      const fromAirport = airports?.filter(a => a.iata === newValue)[0];
      const toAirport = this.toAirport.value ? airports?.filter(a => a.iata === this.toAirport.value)[0] : null;
      
      const newState = toAirport ? { from: fromAirport, to: toAirport } : {from: fromAirport };
      this.setState(newState);

      if (toAirport) {
       const rows: { from: string; to: string; delay: number; covid: number; carrier: string}[] = [];
       const flightData = this.flights.filter(f => f.from =  this.fromAirport.value && f.to == newValue);
       flightData.forEach(d => rows.push({from: fromAirport.name, to: toAirport.name, delay: +d.delay, covid: +d.covid, carrier: d.carrier }));
     //  this.rowData = rows;
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
     this.http.get(`/api/flight/${fromAirport.iata}/${toAirport.iata}`)
          .subscribe((res) => {
            console.log('RES: ', res)
            return this.flights = res as  {from: string, to: string, covid: string, delay: number, carrier: string }[];
          })
   //  this.rowData = rows;
   });
  }

  private setState(signals: unknown): void {
    this.view?.setState({ signals });
    this.view?.runAsync();
  }


  private parseData(): void {
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
