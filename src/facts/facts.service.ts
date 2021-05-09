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
    const { fact, isTrue, image, categoryId } = createFactDto;
    const newFact = new Fact();
    newFact.fact = fact;
    newFact.isTrue = isTrue;
    newFact.image = image ?? null;
    newFact.categoryId = categoryId;
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

  async findOneTrueAndFalse(): Promise<Fact[]> {
    try {
      const availableFacts = await this.findAll();
      const idFacts = availableFacts.map(({ id }: Fact) => id);

      const factsLength = idFacts.length;

      const randomTrueFact = idFacts[Math.floor(Math.random() * factsLength)];
      let randomFalseFact = idFacts[Math.floor(Math.random() * factsLength)];

      while (randomTrueFact === randomFalseFact) {
        randomFalseFact = idFacts[Math.floor(Math.random() * factsLength)];
      }

      const trueAndFalseFact = [];
      trueAndFalseFact.push(await this.factRepository.findOneOrFail(randomTrueFact));
      trueAndFalseFact.push(await this.factRepository.findOneOrFail(randomFalseFact));

      return trueAndFalseFact;
    } catch (err) {
      // throw new ObjectNotFoundException({ id });
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
