import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './flight.entity';
import { FlightService } from './flight.service';
import { FlightsController } from './flight.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Flight])],
  providers: [FlightService],
  controllers: [FlightsController],
})
export class FlightModule {}