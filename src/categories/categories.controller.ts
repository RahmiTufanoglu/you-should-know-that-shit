import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ClaimEntity } from '../claims/entities/claim.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Category } from './entities/category.entity';
import { SETTINGS } from '../app.utils';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';

// import { Category } from './interfaces/category.interface';

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

  @ApiOkResponse({ type: ClaimEntity, isArray: true })
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

  @ApiOperation({ summary: 'Edit a category with a specific id' })
  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @UsePipes(ValidationPipe)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.categoriesService.remove(id);
  }

}
