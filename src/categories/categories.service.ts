import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository, UpdateResult } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ObjectNotFoundException } from '../exceptions/object-not-found-exception';
// import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const { category } = createCategoryDto;

    const foundCategory = await this.categoryRepository.findOne({ category });

    if (foundCategory) {
      throw new HttpException('Category exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newCategory = new CategoryEntity();
    Object.assign(newCategory, createCategoryDto);
    return this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  async findById(id: number): Promise<CategoryEntity> {
    return this.getCategoryById(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    if (!!await this.getCategoryById(id)) {
      return this.categoryRepository.update(id, updateCategoryDto);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    if (!!await this.getCategoryById(id)) {
      return this.categoryRepository.delete(id);
    }
  }

  async getCategoryById(id: number): Promise<CategoryEntity> {
    try {
      return await this.categoryRepository.findOneOrFail(id);
    } catch (err) {
      throw new ObjectNotFoundException({ id });
    }
  }

}
