import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FactEnitity } from './fact.entity';
import { ObjectNotFoundException } from '../exceptions/object-not-found-exception';
import { Fact, FactWithoutIsCorrect } from './fact.model';

@Injectable()
export class FactsService {

  constructor(
    @InjectRepository(FactEnitity)
    private readonly factRepository: Repository<FactEnitity>,
  ) {
  }

  async create(createFactDto: CreateFactDto): Promise<Fact> {
    const { fact } = createFactDto;
    const foundFact = await this.factRepository.findOne({ fact });

    if (foundFact) {
      throw new HttpException('Fact exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newFact: Fact = new FactEnitity();
    Object.assign(newFact, newFact);
    return this.factRepository.save(newFact);
  }

  async findAll(): Promise<Fact[]> {
    return this.factRepository.find();
  }

  async findAllWithoutSolution(): Promise<FactWithoutIsCorrect[]> {
    const facts = await this.factRepository.find();
    const shuffledFacts = this.shuffle(facts);
    return shuffledFacts.map(({ isTrue, ...rest }: Fact) => rest);
  }

  filterRandomFact(availableFacts: Fact[], isFactTrue: boolean): string {
    const facts = availableFacts
      .filter(({ isTrue }: Fact) => isTrue === isFactTrue)
      .map(({ fact }: Fact) => fact);

    return facts[Math.floor(Math.random() * facts.length)];
  }

  // TODO
  async checkIfCorrect(): Promise<any> {
    return false;
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

  private shuffle(facts: Fact[]): Fact[] {
    for (let i = facts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [facts[i], facts[j]] = [facts[j], facts[i]];
    }
    return facts;
  }

}
