import { Injectable } from '@nestjs/common';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Fact } from './entities/fact.entity';

@Injectable()
export class FactsService {
  constructor(@InjectRepository(Fact) private readonly factRepository: Repository<Fact>) {
  }

  create(fact: CreateFactDto): Promise<Fact> {
    return this.factRepository.save(fact);
  }

  findAll(): Promise<Fact[]> {
    return this.factRepository.find();
  }

  findOne(id: number): Promise<Fact> {
    return this.factRepository.findOneOrFail(id);
  }

  update(id: number, updateFactDto: UpdateFactDto): Promise<UpdateResult> {
    return this.factRepository.update(id, updateFactDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.factRepository.delete(id);
  }
}
