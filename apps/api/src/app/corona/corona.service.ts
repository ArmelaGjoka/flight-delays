
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Corona } from './corona.entity'; 

@Injectable()
export class CoronaService {
  constructor(
    @InjectRepository(Corona)
    private readonly coronaRepository: Repository<Corona>
  ) {
  }

  async findAll(): Promise<Corona[]> {
    return await this.coronaRepository.find();
  }
}