import { Injectable, Inject } from '@nestjs/common';
import { Corona } from './corona.entity';

@Injectable()
export class CoronaService {
  constructor(
    @Inject('CORONA_REPOSITORY')
    private coronaRepository: typeof Corona
  ) {}

  async findAll(): Promise<Corona[]> {
    return this.coronaRepository.findAll<Corona>();
  }
}