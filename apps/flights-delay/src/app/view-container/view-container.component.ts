import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FROM_AIRPORT_LIST, TO_AIRPORT_LIST } from '../constants/aiports';
import { Airport } from './models/airport.model';
import { Covid } from './models/covid.model';
import { Flight } from './models/flight.model';
import { FlightCovid } from './models/flightCovid.model';
import { CovidService } from './services/covid.service';
import { FlightService } from './services/flight.service';
import { PredictService } from './services/predict.service';
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

  flights: FlightCovid[] = [];
  airports: Airport[] = [];

  covidData: { [fips: string]: { [date: string]: Covid } } = {};
  
  chartState: unknown;

  showNoFlightsMessage = false;
  avgDelay: number | null = null;
  predictedDelay: number | null = null;

  constructor(
    private flightService: FlightService,
    private utilityService: UtilityService,
    private covidService: CovidService,
    private predictService: PredictService
  ) {}

  ngOnInit(): void {


    this.utilityService.getAirports().subscribe(res => this.airports = res);
    this.covidService.getCovidData().subscribe((data: Covid[]) => {
        data.forEach(row => {
            if (!this.covidData[row.fips_state]) {
                this.covidData[row.fips_state] = { [row.date] : row };
            } else {
                this.covidData[row.fips_state][row.date] = row;
            }
        })
    });
    
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
    this.flightService.getFlightsByOriginDest(from.iata, to.iata).pipe(
    ).subscribe((res: Flight[]) => {
        if (res?.length == 0) {
            this.showNoFlightsMessage = true;
            return;
        }
        let sumDelay = 0;
        this.showNoFlightsMessage = false;
        this.flights = res.map(flight => {    
          sumDelay += flight.arr_delay;
            const flightCovid: FlightCovid = {...flight};  
            if (this.covidData[flight.origin_state_fips] && this.covidData[flight.origin_state_fips][flight.fl_date])  {
                const covidOrigin: Covid =  this.covidData[flight.origin_state_fips][flight.fl_date];

                flightCovid.originCovidCases = covidOrigin.cases;
                flightCovid.originCovidDeaths = covidOrigin.deaths;
                flightCovid.originCasesPerc = covidOrigin.cases_perc;
            }

            if (this.covidData[flight.dest_state_fips] && this.covidData[flight.dest_state_fips][flight.fl_date]) {
                const covidDest: Covid =  this.covidData[flight.dest_state_fips][flight.fl_date];
                flightCovid.destCovidCases = covidDest.cases;
                flightCovid.destCovidDeaths = covidDest.deaths;
                flightCovid.destCovidPerc = covidDest.cases_perc;
            }
            return flightCovid;
        })

        this.avgDelay = sumDelay / res.length;
      })
  }

  predictDelay(value: unknown): void {
    console.log('Value: ', value);
    this.predictService.predictDelay(value).subscribe((del: number) => this.predictedDelay = del)
  }

  returnZero() {
    return 0;
  }
}
