import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Fact } from './entities/fact.entity';
import { ObjectNotFoundException } from '../exceptions/object-not-found-exception';
import { Category } from '../categories/entities/category.entity';
import { TrueAndFalseFact } from './interfaces/true-and-false-fact.model';
import { FactIdType } from './types/fact-id.type';

@Injectable()
export class FactsService {

  constructor(
    @InjectRepository(Fact)
    private readonly factRepository: Repository<Fact>,
  ) {
  }

  // private static shuffle(facts: Fact[]): Fact[] {
  //   for (let i = facts.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [facts[i], facts[j]] = [facts[j], facts[i]];
  //   }
  //   return facts;
  // }

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

  //TODO
  async filterByCategory(category: Category) {
    return null;
  }

  async findRandomFacts(): Promise<TrueAndFalseFact[]> {
    const facts = await this.factRepository.find();
    const trueFacts = facts
      .filter(({ isTrue }: Fact) => isTrue)
      .slice(0, 100)
      .map(({ id, fact, image }: Fact) => {
        return { id, fact, image };
      });
    const falseFacts = facts
      .filter(({ isTrue }: Fact) => !isTrue)
      .slice(0, 100)
      .map(({ id, fact, image }: Fact) => {
        return { id, fact, image };
      });

    const shuffledTrueFacts = this.shuffleFacts(trueFacts);
    const shuffledFalseFacts = this.shuffleFacts(falseFacts);

    const randomTrueAndFalseFacts: TrueAndFalseFact[] = [];
    for (let i = 0; i < Math.min(shuffledTrueFacts.length, shuffledFalseFacts.length); i++) {
      randomTrueAndFalseFacts.push({
        trueFact: shuffledTrueFacts[i],
        falseFact: shuffledFalseFacts[i],
      });
    }

    return randomTrueAndFalseFacts;
  }

  async findRandomCorrectFact(): Promise<Fact> {
    const facts = await this.factRepository.find();
    const correctFacts = facts.filter(({ isTrue }: Fact) => isTrue);
    return correctFacts[Math.floor(Math.random() * correctFacts.length)];
  }

  // async findAllWithoutSolution(): Promise<FactType[]> {
  //   const facts = await this.factRepository.find();
  //   const shuffledFacts = FactsService.shuffle(facts);
  //   return shuffledFacts.map(({ isTrue, ...rest }: Fact) => rest);
  // }

  async checkIfCorrect(factId: number): Promise<boolean> {
    const fact = await this.getFactById(factId);
    return fact.isTrue;
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

  shuffleFacts(facts: FactIdType[]): FactIdType[] {
    return facts.sort(() => Math.random() - 0.5);
  }

}
