import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PredictService {

    constructor(private http: HttpClient) {}

    predictDelay(value: any): Observable<number> {

        return  this.http.post<number>('/predict-api', { value });
    }
}