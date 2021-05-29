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
import { CategoryValidationPipe } from '../shared/pipes/category-validation.pipe';
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

  @ApiOkResponse({ type: Fact, isArray: true })
  @ApiOperation({ summary: 'Show all facts' })
  // @UsePipes(ValidationPipe)
  @Get('all')
  async findAll(@Query() filterCorrectFacts: FilterCorrectFactDto): Promise<Fact[]> {
    return this.factsService.findAllSpecificFacts(String(filterCorrectFacts.isTrue));
  }

  @ApiOkResponse({ type: Fact, isArray: true })
  @ApiOperation({ summary: 'Show random true and false fact couples' })
  @UsePipes(ValidationPipe)
  @Get()
  async findRandomFacts(): Promise<TrueAndFalseFact[]> {
    this.logger.verbose(`Retrieving random facts`);
    return this.factsService.findRandomFacts();
  }

  @ApiOkResponse({ type: Fact, isArray: true })
  @ApiOperation({ summary: 'Show random true fact' })
  @UsePipes(ValidationPipe)
  @Get('correct')
  async findRandomCorrectFact(): Promise<Fact> {
    return this.factsService.findRandomCorrectFact();
  }

  @ApiOkResponse({ type: Fact, isArray: true })
  @ApiOperation({ summary: 'Filter by category' })
  @UsePipes(ValidationPipe)
  @Get('filter')
  async filterByCategory(@Query('category', CategoryValidationPipe) category: string) {
    return this.factsService.filterByCategory(category);
  }

  @ApiCreatedResponse({ type: Fact })
  @ApiOperation({ summary: 'Check if the selection is correct' })
  @UsePipes(ValidationPipe)
  @Get('check/:id')
  async checkIfCorrect(
    @Param('id') id: number,
    @GetUser() user: User,
    // @Req() req: RequestWithUser,
  ): Promise<boolean> {
    return this.factsService.checkIfCorrect(id, user);
  }

  @ApiOkResponse({ type: Fact })
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Find a fact with a specific id' })
  @UsePipes(ValidationPipe)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Fact> {
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
