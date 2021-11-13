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

  async findByName(year: number): Promise<Flight> {
    const result = await this.flightRepository.find({ year });
    return result[0];
  }
}