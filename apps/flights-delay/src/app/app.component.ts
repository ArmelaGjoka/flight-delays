import { Component } from '@angular/core';

declare let vega: any;

@Component({
  selector: 'flight-delays-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Flights Delay';
}