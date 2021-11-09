import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PopulationController } from "./population.controller";
import { Population } from "./population.entity";
import { PopulationService } from "./population.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Population]),
      ],
      providers: [PopulationService],
      controllers: [PopulationController]
})
export class PopulationModule {}