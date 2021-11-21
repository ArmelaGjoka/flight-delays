import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Covid } from "../models/covid.model";

@Injectable({
    providedIn: 'root'
})
export class CovidService {

    private static PATH = '/api/corona';

    constructor(private http: HttpClient) {}

    getCovidData(): Observable<Covid[]> {
        return this.http.get<Covid[]>(CovidService.PATH);
    }
}