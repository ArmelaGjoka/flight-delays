import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from '../database/database.module';
import { CoronaModule } from './corona/corona.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PopulationModule } from './population/population.module';


@Module({
  imports: [
    DatabaseModule,
/*     CoronaModule, */
    PopulationModule,
/*     TypeOrmModule.forRoot({
      database: "./flights.db", // "C:/Users/Matrics/Desktop/apps/DVA_PROJECT_DATA_v0.3/flights.db",
      synchronize: true,
      entities: [
        "dist/*.entity/.js"
      ],
   }), */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
