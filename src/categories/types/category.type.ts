import { Category } from '../entities/category.entity';

export type CategoryType = Omit<Category, 'updateTimestamp'>;
