import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class FlightService {

    private static PATH = 'flight';

    constructor(private http: HttpClient) {}

    getFlightsByOriginDest(origin: string, destination: string) {
        const url = `${FlightService.PATH}/${origin}/${destination}`
        
        return this.http.get(url);
    }
}