import { Controller, Get, Param } from "@nestjs/common";
import { Flight } from "./flight.entity";
import { FlightService } from "./flight.service";

@Controller('flight')
export class FlightsController {
    constructor(private readonly flightService: FlightService) {}

    @Get()
    getFlights(): Promise<Flight[]> {
      return this.flightService.findAll();
    }

    @Get(':origin/:dest')
    getFlightByOriginDest(@Param() data: {origin: string, dest: string}): Promise<Flight[]> {
      return this.flightService.getFlightsByOriginDest(data.origin, data.dest);

    }

    @Get('/count')
    groupFlightsByOrigin() {

      return this.flightService.getFlightsGroupedByOrigin();
    }
}