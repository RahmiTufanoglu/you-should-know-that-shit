// import { CategoryEntity } from '../../categories/entities/category.entity';
//
// export interface Fact {
//   id: string;
//   fact: string;
//   isTrue: boolean;
//   image: string;
//   createdAt: Date;
//   updatedAt: Date;
//   categoryId: string;
//   category: CategoryEntity;
// }
//
// export type FactWithoutIsCorrect = Omit<Fact, 'isTrue'>

import { FactEnitity } from '../entities/fact.entity';

export type FactType = Omit<FactEnitity, 'isTrue' | 'updateTimestamp'>
