import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Flight } from "../models/flight.model";

@Injectable({
    providedIn: 'root'
})
export class FlightService {

    private static PATH = '/api/flight';

    constructor(private http: HttpClient) {}

    getFlightsByOriginDest(origin: string, destination: string): Observable<Flight[]> {
        const url = `${FlightService.PATH}/${origin}/${destination}`
        
        return this.http.get<Flight[]>(url);
    }

    getFlightsGroupedByOrigin(): Observable<{origin: string, destination: string, count: number}[]> {
        return this.http.get<{origin: string, destination: string, count: number}[]>(`${FlightService.PATH}/count`)
    }
    
}