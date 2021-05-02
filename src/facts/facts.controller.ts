import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
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

@ApiTags('facts')
@Controller('facts')
export class FactsController {

  constructor(private readonly factsService: FactsService) {
  }

  @ApiCreatedResponse({ type: Fact })
  @ApiOperation({ summary: 'Create a fact with an image' })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(@Body() createFactDto: CreateFactDto,
               @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const fact = await this.factsService.create(createFactDto);
    return {
      fact,
      file: file.buffer.toString(),
    };
  }

  @ApiOkResponse({ type: Fact, isArray: true })
  @ApiOperation({ summary: 'Show all users' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get()
  async findAll(): Promise<Fact[]> {
    return this.factsService.findAll();
  }

  @ApiOkResponse({ type: Fact })
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Find a user with a specific id' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Fact> {
    return this.factsService.findById(id);
  }

  @ApiOperation({ summary: 'Edit a user with a specific id' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateFactDto: UpdateFactDto): Promise<UpdateResult> {
    return this.factsService.update(id, updateFactDto);
  }

  @ApiOperation({ summary: 'Delete a user with a specific id' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.factsService.remove(id);
  }

}
