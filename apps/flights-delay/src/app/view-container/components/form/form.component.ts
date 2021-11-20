import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CARRIER_LIST } from '../../../constants/carrier';

@Component({
  selector: 'flight-delays-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  carriers = CARRIER_LIST;

  form = new FormGroup({
    // Flight
    departureDelay: new FormControl(), // Avg default
    distance: new FormControl(), // Current Distance
    // Time
    hour: new FormControl(),
    day: new FormControl(),
    month: new FormControl(),
    // Covid
    covidOrigin: new FormControl(),
    covidDest: new FormControl(),
    increaseOrigin: new FormControl(),
    increaceDest: new FormControl(),
    // Airline
    airline: new FormControl(),
  })

  constructor() { 
    console.log('TODO FORM');
  }

  ngOnInit(): void {
    console.log('TODO FORM');
  }

  predictDelay() {
    console.log('Predict delay');
  }

}
