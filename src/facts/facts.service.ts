import { Injectable } from '@nestjs/common';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Fact } from './entities/fact.entity';
import { ObjectNotFoundException } from '../exceptions/object-not-found-exception';

@Injectable()
export class FactsService {

  constructor(
    @InjectRepository(Fact)
    private readonly factRepository: Repository<Fact>,
  ) {
  }

  create(createFactDto: CreateFactDto): Promise<Fact> {
    const newFact = new Fact();
    newFact.fact = createFactDto.fact;
    newFact.isTrue = createFactDto.isTrue;
    newFact.image = createFactDto.image ?? null;
    return this.factRepository.save(newFact);
  }

  findAll(): Promise<Fact[]> {
    return this.factRepository.find();
  }

  async findById(id: number): Promise<Fact> {
    return this.getFactById(id);
  }

  async update(id: number, updateFactDto: UpdateFactDto): Promise<UpdateResult> {
    if (!!await this.getFactById(id)) {
      return this.factRepository.update(id, updateFactDto);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    if (!!await this.getFactById(id)) {
      return this.factRepository.delete(id);
    }
  }

  async getFactById(id: number): Promise<Fact> {
    try {
      return await this.factRepository.findOneOrFail(id);
    } catch (err) {
      throw new ObjectNotFoundException({ id });
    }
  }

}
