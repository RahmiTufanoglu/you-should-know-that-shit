import { Fact } from '../entities/fact.entity';

export type FactType = Omit<Fact, 'correct' | 'updateTimestamp'>
