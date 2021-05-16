import { Category } from '../categories/category.entity';

export interface Fact {
  id: string;
  fact: string;
  isTrue: boolean;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  category: Category;
}

export type FactWithoutIsCorrect = Omit<Fact, 'isTrue'>
