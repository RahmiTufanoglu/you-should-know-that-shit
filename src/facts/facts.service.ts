import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FactEnitity } from './entities/fact.entity';
// import { Fact, FactWithoutIsCorrect } from './interfaces/fact.interface';
import { ObjectNotFoundException } from '../exceptions/object-not-found-exception';
import { FactType } from './types/fact.type';

@Injectable()
export class FactsService {

  constructor(
    @InjectRepository(FactEnitity)
    private readonly factRepository: Repository<FactEnitity>,
  ) {
  }

  private static shuffle(facts: FactEnitity[]): FactEnitity[] {
    for (let i = facts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [facts[i], facts[j]] = [facts[j], facts[i]];
    }
    return facts;
  }

  async create(createFactDto: CreateFactDto): Promise<FactEnitity> {
    const { fact } = createFactDto;
    const foundFact = await this.factRepository.findOne({ fact });

    if (foundFact) {
      throw new HttpException('Fact exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newFact = new FactEnitity();
    Object.assign(newFact, createFactDto);
    return this.factRepository.save(newFact);
  }

  async findAll(): Promise<FactEnitity[]> {
    return this.factRepository.find();
  }

  async findAllWithoutSolution(): Promise<FactType[]> {
    const facts = await this.factRepository.find();
    const shuffledFacts = FactsService.shuffle(facts);
    return shuffledFacts.map(({ isTrue, ...rest }: FactEnitity) => rest);
  }

  async filterRandom(): Promise<FactEnitity> {
    const facts = await this.factRepository.find();
    facts
      .filter(({ isTrue }: FactEnitity) => isTrue)
      .forEach(({ fact }: FactEnitity) => fact);

    return facts[Math.floor(Math.random() * facts.length)];
  }

  async checkIfCorrect(factId: number): Promise<boolean> {
    const fact = await this.getFactById(factId);
    return fact.isTrue;
  }

  async findById(id: number): Promise<FactEnitity> {
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

  async getFactById(id: number): Promise<FactEnitity> {
    try {
      return await this.factRepository.findOneOrFail(id);
    } catch (err) {
      throw new ObjectNotFoundException({ id });
    }
  }

}
