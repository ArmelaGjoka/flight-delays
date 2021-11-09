import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'flight-delays-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Flights Delay';

  constructor( private http: HttpClient) {
    this.http.get('/api').subscribe(r => console.log('Population: ', r))
  }
}
