import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {
  }

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne(id);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.categoryRepository.delete(id);
  }

}
