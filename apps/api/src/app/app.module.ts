import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightModule } from './flight/flight.module';
import { Flight } from './flight/flight.entity';
import { CoronaModule } from './corona/corona.module';
import { Corona } from './corona/corona.entity';


@Module({
  imports: [
    FlightModule,
    CoronaModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:  "flights.db",
      synchronize: false,
      migrationsRun: false,
      entities: [
        Flight, Corona
      ],
   }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
