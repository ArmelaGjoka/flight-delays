import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
          const del = avgDelay.toLocaleString('en-us', {minimumFractionDigits: 2})
          this.form.get('dep_delay')?.setValue(del);
          this.form.get('distance')?.setValue( values[0].distance);
      } else {
        this.form.get('dep_delay')?.setValue(null);
        this.form.get('distance')?.setValue(null);
      }
  }

  @Output() predictFormEmitter = new EventEmitter();

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
    orig_cases_perc: new FormControl(),
    dest_cases_perc: new FormControl(),
    orig_cases_increase_7: new FormControl(),
    dest_cases_increase_7: new FormControl(),
    // Airline
    airline: new FormControl(),
  });

  constructor(private _snackBar: MatSnackBar) {}

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

  predictDelay(): void {
    if (!this.form.valid) {
      this._snackBar.open('Form is not valid, please update the values', 'Ok', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
        return;
    }

    const airline = this.form.value.airline ? CARRIER_LIST_MAPPER[this.form.value.airline] : null;    
    this.predictFormEmitter.emit({ ...this.form.value, airline});
  }

}
