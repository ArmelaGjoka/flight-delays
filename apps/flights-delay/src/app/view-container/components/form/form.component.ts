import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { CARRIER_LIST, CARRIER_LIST_MAPPER } from '../../../constants/carrier';
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
      } else {
        this.form.get('departureDelay')?.setValue(null);
        this.form.get('distance')?.setValue(null);
      }
  }

  carriers = CARRIER_LIST;

  carrier_mapper = CARRIER_LIST_MAPPER;

  filteredCarriers: Observable<string[]> | undefined = of(this.carriers);

  form = new FormGroup({
    // Flight
    dep_delay: new FormControl(), 
    distance: new FormControl(), 
    // Time
    hour_of_day: new FormControl(),
    day_of_week: new FormControl(),
    month: new FormControl(),
    // Covid
    orig_cases_perc: new FormControl(0.0),
    dest_cases_perc: new FormControl(0.0),
    orig_cases_increase_7: new FormControl(0.0),
    dest_cases_increase_7: new FormControl(0.0),
    // Airline
    airline: new FormControl(null, Validators.required),
  });

  constructor(private http: HttpClient) {}

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

    const value = { ...this.form.value, airline: CARRIER_LIST_MAPPER[this.form.value.airline]};
    
    this.http.post('/predict-api', { value }).subscribe(r => console.log('Predict: ', this.form.value.airline))
    
    console.log('Predict delay: ', value);
  }

}
