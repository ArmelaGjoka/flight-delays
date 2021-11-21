import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { CARRIER_LIST } from '../../../constants/carrier';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'flight-delays-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() set flights(values: Flight[]) {
      if (values?.length > 0) {
          const avgDelay = values.reduce((sum, current) => sum + current.dep_delay, 0) / values.length;
          this.form.get('departureDelay')?.setValue(avgDelay);
          this.form.get('distance')?.setValue( values[0].distance);
      }
  }

  carriers = CARRIER_LIST;

  filteredCarriers: Observable<string[]> | undefined = of(this.carriers);

  form = new FormGroup({
    // Flight
    departureDelay: new FormControl(), 
    distance: new FormControl(), 
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

  ngOnInit(): void {
    this.filteredCarriers = this.form.get('airline')?.valueChanges.pipe(
       startWith(''),
       map(name => (name ? this.filter(name) : this.carriers.slice())),
    )
  }

  private filter(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.carriers.filter(option => option.toLowerCase().includes(filterValue));
  }

  predictDelay() {
    console.log('Predict delay');
  }

}
