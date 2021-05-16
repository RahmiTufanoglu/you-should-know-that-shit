import { Fact } from './entities/fact.entity';

export type FactWithoutSolution = Omit<Fact, 'isTrue'>;
