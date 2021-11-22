import { Flight } from "./flight.model";

export interface FlightCovid  extends Flight {

    // Optional, some data might be missing
    originCovidCases?: number;
    originCovidDeaths?: number;
    originCasesPerc?: number;

    destCovidCases?: number;
    destCovidDeaths?: number;
    destCovidPerc?: number;
}