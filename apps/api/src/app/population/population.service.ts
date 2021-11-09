import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Population } from "./population.entity";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PopulationService {

    constructor(
        @InjectRepository(Population) private populationRepository: Repository<Population>,
    ) {}

    findAll(): Promise<Population[]> {
        return this.populationRepository.find();
    }
}