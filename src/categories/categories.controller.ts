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
export class CategoriesController {

  constructor(private readonly categoriesService: CategoriesService) {
  }

  @ApiCreatedResponse({ type: Claim })
  @Post()
  async create(@Body(SETTINGS.VALIDATION_PIPE) createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoriesService.create(createCategoryDto);
  }

  @ApiOkResponse({ type: Claim, isArray: true })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  @ApiOkResponse({ type: Claim })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Category> {
    return await this.categoriesService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateClaimDto: UpdateClaimDto): Promise<UpdateResult> {
    return await this.categoriesService.update(id, updateClaimDto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return await this.categoriesService.remove(id);
  }

}
