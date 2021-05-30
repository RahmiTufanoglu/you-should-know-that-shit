import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FactsService } from './facts.service';
import { Fact } from './entities/fact.entity';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { TrueAndFalseFact } from './interfaces/true-and-false-fact.model';
import { FilterCorrectFactDto } from './dto/filter-correct-fact.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('facts')
@UseGuards(JwtAuthGuard)
@Controller('facts')
export class FactsController {

  private logger = new Logger('FactsController');

  constructor(private readonly factsService: FactsService) {
  }

  @ApiCreatedResponse({ type: Fact })
  @ApiOperation({ summary: 'Create a fact with an image' })
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(FileInterceptor('file'))
  @Post('create')
  async create(@Body() createFactDto: CreateFactDto,
               @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const fact = await this.factsService.create(createFactDto);
    this.logger.log(`Image: ${file}`);
    return {
      fact,
      file: file?.buffer.toString(),
    };
  }

  @ApiOkResponse({ type: Fact, isArray: true })
  @ApiOperation({ summary: 'Show all or specific facts' })
  @Get('all')
  async findAll(@Query() filterCorrectFacts: FilterCorrectFactDto): Promise<Fact[]> {
    return this.factsService.findAll(
      String(filterCorrectFacts.correct),
      filterCorrectFacts.category,
    );
  }

  @ApiOkResponse({ type: Fact, isArray: true })
  @ApiOperation({ summary: 'Show random true and false fact couples' })
  @UsePipes(ValidationPipe)
  @Get()
  async findRandomTrueAndFalseFact(): Promise<TrueAndFalseFact[]> {
    this.logger.verbose(`Retrieving random facts`);
    return this.factsService.findRandomTrueAndFalseFact();
  }

  @ApiOkResponse({ type: Fact, isArray: true })
  @ApiOperation({ summary: 'Show random true fact' })
  @UsePipes(ValidationPipe)
  @Get('random')
  async findRandomCorrectFact(): Promise<Fact> {
    return this.factsService.findRandomCorrectFact();
  }

  @ApiOkResponse({ type: Fact })
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Find a fact with a specific id' })
  @UsePipes(ValidationPipe)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Fact> {
    return this.factsService.findById(id);
  }

  @ApiCreatedResponse({ type: Fact })
  @ApiOperation({ summary: 'Check if the selection is correct' })
  @UsePipes(ValidationPipe)
  @Post(':id')
  async checkIfFactIsCorrect(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ correct: boolean, newScore: number }> {
    return this.factsService.checkIfFactIsCorrect(id, user);
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
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.factsService.delete(id);
  }

}
