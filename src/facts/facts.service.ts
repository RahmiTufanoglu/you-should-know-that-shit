import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create(createFactDto: CreateFactDto): Promise<Fact> {
    const { fact } = createFactDto;
    const foundFact = await this.factRepository.findOne({ fact });

    if (foundFact) {
      throw new HttpException('Fact exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newFact = new Fact();
    Object.assign(newFact, createFactDto);
    return this.factRepository.save(newFact);
  }

  async findAll(): Promise<Fact[]> {
    return this.factRepository.find();
  }

  async findOneTrueAndFalse(): Promise<{ trueFact: string, falseFact: string }> {
    try {
      const availableFacts = await this.findAll();
      return {
        trueFact: this.filterRandomFact(availableFacts, true),
        falseFact: this.filterRandomFact(availableFacts, false),
      };
    } catch (err) {
    }
  }

  filterRandomFact(availableFacts: Fact[], isFactTrue: boolean): string {
    const facts = availableFacts
      .filter(({ isTrue }: Fact) => isTrue === isFactTrue)
      .map(({ fact }: Fact) => fact);

    return facts[Math.floor(Math.random() * facts.length)];
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
