import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FactsService } from './facts.service';
import { FactEnitity } from './entities/fact.entity';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { FactType } from './types/fact.type';
// import { Fact, FactWithoutIsCorrect } from './interfaces/fact.interface';

@ApiTags('facts')
@UseGuards(JwtAuthGuard)
@Controller('facts')
export class FactsController {

  constructor(private readonly factsService: FactsService) {
  }

  @ApiCreatedResponse({ type: FactEnitity })
  @ApiOperation({ summary: 'Create a fact with an image' })
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(@Body() createFactDto: CreateFactDto,
               @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const fact = await this.factsService.create(createFactDto);
    console.log('Image', file);
    return {
      fact,
      file: file?.buffer.toString(),
    };
  }

  @ApiOkResponse({ type: FactEnitity, isArray: true })
  @ApiOperation({ summary: 'Show all facts' })
  @UsePipes(ValidationPipe)
  @Get()
  async findAll(): Promise<FactEnitity[]> {
    return this.factsService.findAll();
  }

  @ApiOkResponse({ type: FactEnitity, isArray: true })
  @ApiOperation({ summary: 'Show random true fact' })
  @UsePipes(ValidationPipe)
  @Get('random')
  async findRandom(): Promise<FactEnitity> {
    return this.factsService.filterRandom();
  }

  @ApiOkResponse({ type: FactEnitity, isArray: true })
  @ApiOperation({ summary: 'Show all facts without solutions' })
  @UsePipes(ValidationPipe)
  @Get()
  async findAllWithoutSolution(): Promise<FactType[]> {
    return this.factsService.findAllWithoutSolution();
  }

  @ApiCreatedResponse({ type: FactEnitity })
  @ApiOperation({ summary: 'Check if the selection is correct' })
  @UsePipes(ValidationPipe)
  @Post('correct')
  async checkIfCorrect(@Param('id') id: number): Promise<boolean> {
    return this.factsService.checkIfCorrect(id);
  }

  @ApiOkResponse({ type: FactEnitity })
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Find a fact with a specific id' })
  @UsePipes(ValidationPipe)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<FactEnitity> {
    return this.factsService.findById(id);
  }

  @ApiOperation({ summary: 'Edit a fact with a specific id' })
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFactDto: UpdateFactDto,
  ): Promise<UpdateResult> {
    return this.factsService.update(id, updateFactDto);
  }

  @ApiOperation({ summary: 'Delete a user with a specific id' })
  @UsePipes(ValidationPipe)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.factsService.remove(id);
  }

}
