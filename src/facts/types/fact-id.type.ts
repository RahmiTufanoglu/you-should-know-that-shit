import { Fact } from '../entities/fact.entity';

export type FactIdType = Pick<Fact, 'id' | 'fact' | 'image'>
