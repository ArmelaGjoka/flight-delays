import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Airport } from "../models/airport.model";

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor(private http: HttpClient) {}

    getAirports(): Observable<Airport[]> {
        return this.http.get('../assets/data/airports.csv', { responseType: "text"})
        .pipe(
            map(data => {
                const airports: Airport[] = [];
                const list = data.split('\n');
                list.forEach(value => {
                  const data = value.split(',');
                  const airport = {iata: data[0], name: data[1], city: data[2], state: data[3], country: data[4], latitude: data[5], longtitude: data[6]};
                  airports.push(airport);
              });
              return airports;
            
        }))
        };

}