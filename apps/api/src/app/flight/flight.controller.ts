import { Controller, Get, Param } from "@nestjs/common";
import { Flight } from "./flight.entity";
import { FlightService } from "./flight.service";

@Controller('flight')
export class FlightsController {
    constructor(private readonly productService: FlightService) {}

    @Get()
    getFlights(): Promise<Flight[]> {
      return this.productService.findAll();
    }

    @Get(':year')
    getProductByName(@Param() params: {year: number}): Promise<Flight> {
      return this.productService.findByName(params.year);
    }
}