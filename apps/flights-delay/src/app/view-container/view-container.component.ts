import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FROM_AIRPORT_LIST, TO_AIRPORT_LIST } from '../constants/aiports';
import { Airport } from './models/airport.model';
import { Flight } from './models/flight.model';
import { FlightService } from './services/flight.service';
import { UtilityService } from './services/utility.service';

@Component({
  selector: 'flight-delays-view-container',
  templateUrl: './view-container.component.html',
  styleUrls: ['./view-container.component.css']
})
export class ViewContainerComponent implements OnInit {

  fromAirportList = FROM_AIRPORT_LIST;
  toAirportList = TO_AIRPORT_LIST;
  fromAirport = new FormControl();
  toAirport = new FormControl();

  flights: Flight[] = [];
  airports: Airport[] = [];
  
  chartState: unknown;

  constructor(
    private http: HttpClient,
    private flightService: FlightService,
    private utilityService: UtilityService,
  ) {}

  ngOnInit(): void {
    this.utilityService.getAirports().subscribe(res => this.airports = res);
    
    this.fromAirport.valueChanges.subscribe(newValue => {
      const fromAirport = this.airports?.filter(a => a.iata === newValue)[0];
      const toAirport = this.toAirport.value ? this.airports?.filter(a => a.iata === this.toAirport.value)[0] : null;
      
      this.chartState = toAirport ? { from: fromAirport, to: toAirport } : {from: fromAirport };

      if (toAirport) {
          this.getFlights(fromAirport, toAirport);
      }
   });

   this.toAirport.valueChanges.subscribe(newValue => {
     const fromAirport = this.airports?.filter(a => a.iata === this.fromAirport.value)[0];
     const toAirport = this.airports?.filter(a => a.iata === newValue)[0];
     
     this.chartState = {from: fromAirport, to: toAirport };
     this.getFlights(fromAirport, toAirport);
   });
  }

  private getFlights(from: Airport, to: Airport): void {
    this.flightService.getFlightsByOriginDest(from.iata, to.iata).subscribe((res) => this.flights = res)
  }

}
