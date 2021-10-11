import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

    this.fromAirport.valueChanges.subscribe(newValue => {
       console.log('New Value: ', this.view?.data('airports'), this.view?.getState());
       const currentState  = this.view?.getState().signals;

       const airports = this.view?.data('airports');

       const selectedAirport = airports?.filter(a => a.iata = newValue)[0];
       
       const newState = {...currentState, hover: selectedAirport };

       this.view?.setState({
         signals: newState
       });
       this.view?.runAsync();
       console.log('After: ', newValue, this.view?.getState());
    })
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
