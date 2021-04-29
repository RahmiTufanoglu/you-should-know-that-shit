import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Category } from './entities/category.entity';
import { ObjectNotFoundException } from '../exceptions/object-not-found-exception';

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.save(this.getCategory(new Category(), createCategoryDto));
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findById(id: number): Promise<Category> {
    return this.getCategoryById(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    if (!!await this.getCategoryById(id)) {
      return this.categoryRepository.update(id, this.getCategory(new Category, updateCategoryDto));
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    if (!!await this.getCategoryById(id)) {
      return this.categoryRepository.delete(id);
    }
  }

  getCategory(currentCategory: Category, category: CreateCategoryDto | UpdateCategoryDto): Category {
    currentCategory.category = category.category;
    return currentCategory;
  }

  async getCategoryById(id: number): Promise<Category> {
    try {
      return await this.categoryRepository.findOneOrFail(id);
    } catch (err) {
      throw new ObjectNotFoundException({ id });
    }
  }

}
