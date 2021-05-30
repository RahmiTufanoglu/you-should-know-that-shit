import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository, UpdateResult } from 'typeorm';
import { Fact } from './entities/fact.entity';
import { ObjectNotFoundException } from '../exceptions/object-not-found-exception';
import { TrueAndFalseFact } from './interfaces/true-and-false-fact.model';
import { FactIdType } from './types/fact-id.type';
import { Category } from '../categories/entities/category.entity';
import { FACT_CATEGORY_ENUM } from '../enums';
import { User } from '../users/entities/user.entity';
import { GetFactEnumId } from '../enums/fact.enum';

@Injectable()
export class FactsService {

  private logger = new Logger('FactsService');

  constructor(
    @InjectRepository(Fact)
    private readonly factRepository: Repository<Fact>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async findAll(correct: string, category: FACT_CATEGORY_ENUM): Promise<Fact[]> {
    const query = getRepository(Fact).createQueryBuilder('fact');

    if (correct === 'true' || 'false') {
      query.andWhere('fact.correct = :correct', { correct });
    }

    if (Object.values(FACT_CATEGORY_ENUM).includes(category)) {
      const categoryId = GetFactEnumId(category);
      query.andWhere('fact.categoryId = :categoryId', { categoryId });
    }

    return query.getMany();
  }

  async findRandomTrueAndFalseFact(): Promise<TrueAndFalseFact[]> {
    const facts = await this.factRepository.find();
    const trueFacts = facts
      .filter(({ correct }: Fact) => correct)
      .slice(0, 1000)
      .map(({ id, fact, image, source }: Fact) => {
        return { id, fact, image, source };
      });
    const falseFacts = facts
      .filter(({ correct }: Fact) => !correct)
      .slice(0, 1000)
      .map(({ id, fact, image, source }: Fact) => {
        return { id, fact, image, source };
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
    const correctFacts = facts.filter(({ correct }: Fact) => correct);
    return correctFacts[Math.floor(Math.random() * correctFacts.length)];
  }

  async findById(id: number): Promise<Fact> {
    return this.getFactById(id);
  }

  async checkIfFactIsCorrect(factId: number, user: User): Promise<{ correct: boolean, newScore: number }> {
    const { correct } = await this.getFactById(factId);
    const currentUser = await this.userRepository.findOne(user.id);

    let newScore = currentUser.currentScore;
    if (correct) {
      newScore = ++currentUser.currentScore;
      await this.userRepository.update(currentUser.id, currentUser);
    } else {
      if (currentUser.currentScore > currentUser.highscore) {
        currentUser.highscore = currentUser.currentScore;
      }
      currentUser.currentScore = 0;
      await this.userRepository.update(currentUser.id, currentUser);
    }

    return { correct, newScore };
  }

  async update(id: number, updateFactDto: UpdateFactDto): Promise<UpdateResult> {
    if (!!await this.getFactById(id)) {
      return this.factRepository.update(id, updateFactDto);
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    if (!!await this.getFactById(id)) {
      return this.factRepository.delete(id);
    }
  }

  async getFactById(id: number): Promise<Fact> {
    try {
      return await this.factRepository.findOneOrFail(id);
    } catch (err) {
      this.logger.error(`Failed to find fact by ${id}`, err.stack);
      throw new ObjectNotFoundException({ id });
    }
  }

  shuffleFacts(facts: FactIdType[]): FactIdType[] {
    return facts.sort(() => Math.random() - 0.5);
  }

}
