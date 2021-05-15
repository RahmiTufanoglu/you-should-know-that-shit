import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Claim } from '../claims/entities/claim.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdateClaimDto } from '../claims/dto/update-claim.dto';
import { Category } from './entities/category.entity';
import { SETTINGS } from '../app.utils';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {

  constructor(private readonly categoriesService: CategoriesService) {
  }

  @ApiCreatedResponse({ type: Category })
  @Post()
  async create(@Body(SETTINGS.VALIDATION_PIPE) createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOkResponse({ type: Claim, isArray: true })
  @UsePipes(ValidationPipe)
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @ApiOkResponse({ type: Category })
  @ApiNotFoundResponse()
  @UsePipes(ValidationPipe)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findById(id);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateClaimDto: UpdateClaimDto): Promise<UpdateResult> {
    return this.categoriesService.update(id, updateClaimDto);
  }

  @UsePipes(ValidationPipe)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.categoriesService.remove(id);
  }

}
