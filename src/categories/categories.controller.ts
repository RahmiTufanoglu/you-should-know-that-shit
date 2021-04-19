import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Claim } from '../claims/entities/claim.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdateClaimDto } from '../claims/dto/update-claim.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {
  }

  @ApiCreatedResponse({ type: Claim })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @Res() res): Promise<any> {
    const category = await this.categoriesService.create(createCategoryDto);
    return res.json({
      message: 'Category has been added successfully',
      category,
    });
  }

  @ApiOkResponse({ type: Claim, isArray: true })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() res): Promise<any[]> {
    const categories = await this.categoriesService.findAll();
    return res.json({
      message: 'All categories have been found successfully',
      categories,
    });
  }

  @ApiOkResponse({ type: Claim })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res): Promise<any> {
    const category = await this.categoriesService.findOne(id);
    return res.json({
      message: `Category with id #${id} has been found successfully.`,
      category,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateClaimDto: UpdateClaimDto, @Res() res): Promise<any> {
    const category = await this.categoriesService.update(id, updateClaimDto);
    return res.json({
      message: `Category with the id #${id} has been updated successfully.`,
      category,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res): Promise<any> {
    const category = await this.categoriesService.remove(id);
    return res.json({
      message: `Category with the id #${id} has been deleted successfully.`,
      category,
    });
  }
}
