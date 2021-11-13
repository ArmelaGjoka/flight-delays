import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoronaController } from "./corona.controller";
import { Corona } from "./corona.entity";
import { CoronaService } from "./corona.service";

@Module({
    imports: [TypeOrmModule.forFeature([Corona])],
    providers: [CoronaService],
    controllers: [CoronaController]
  })
  export class CoronaModule {}