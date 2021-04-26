import { Injectable } from '@nestjs/common';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Fact } from './entities/fact.entity';
import { IdNotFoundException } from '../exceptions/id-not-found-exception';

@Injectable()
export class FactsService {

  constructor(@InjectRepository(Fact) private readonly factRepository: Repository<Fact>) {
  }

  create(createFactDto: CreateFactDto): Promise<Fact> {
    return this.factRepository.save(this.getFact(new Fact(), createFactDto));
  }

  findAll(): Promise<Fact[]> {
    return this.factRepository.find();
  }

  async findById(id: number): Promise<Fact> {
    return await this.getFactById(id);
  }

  async update(id: number, updateFactDto: UpdateFactDto): Promise<UpdateResult> {
    if (!!await this.getFactById(id)) {
      return this.factRepository.update(id, this.getFact(new Fact, updateFactDto));
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    if (!!await this.getFactById(id)) {
      return this.factRepository.delete(id);
    }
  }

  getFact(currentFact: Fact, fact: CreateFactDto | UpdateFactDto): Fact {
    currentFact.fact = fact.fact;
    currentFact.isTrue = fact.isTrue;
    currentFact.image = fact.image;
    return currentFact;
  }

  async getFactById(id: number): Promise<Fact> {
    try {
      return await this.factRepository.findOneOrFail(id);
    } catch (err) {
      throw new IdNotFoundException({ id });
    }
  }

}
