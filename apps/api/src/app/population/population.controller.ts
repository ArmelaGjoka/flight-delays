import { Controller, Get } from "@nestjs/common";
import { Population } from "./population.entity";
import { PopulationService } from "./population.service";

@Controller('population')
export class PopulationController {
    
    constructor(private populationService: PopulationService) {}

    @Get()
    index(): Promise<Population[]> {
      return this.populationService.findAll();
    }    
}
