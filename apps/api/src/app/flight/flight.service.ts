import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Flight } from "./flight.entity";

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>) {
    }

  async findAll(): Promise<Flight[]> {
    return await this.flightRepository.find();
  }

  async getFlightsByOriginDest(origin: string, dest: string): Promise<Flight[]> {
    const result = await this.flightRepository.find({ origin, dest });

    return result;
  }

  async getFlightsGroupedByOrigin() {

    const result = await this.flightRepository.query('SELECT origin as origin, dest as destination, COUNT(_rowid_) as count from FILTERED_FLIGHTS_FINAL GROUP BY origin;');
    return result;
  }
}