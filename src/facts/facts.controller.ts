import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FactsService } from './facts.service';
import { Fact } from './entities/fact.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import storage from '../config/storage.config';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';

@ApiTags('facts')
@Controller('facts')
export class FactsController {
  constructor(private readonly factsService: FactsService) {
  }

  @ApiCreatedResponse({ type: Fact })
  @ApiOperation({ summary: 'Create a fact with an image' })
  @UseInterceptors(
    FileInterceptor('file', { storage }),
  )
  @Post()
  async create(
    @Body() createFactDto: CreateFactDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ file: string; body: Fact }> {
    const body = await this.factsService.create(createFactDto);
    console.log('file', file);
    return {
      body,
      file: file.buffer.toString(),
    };
  }

  @ApiOkResponse({ type: Fact, isArray: true })
  @ApiOperation({ summary: 'Show all users' })
  @Get()
  async findAll(): Promise<Fact[]> {
    return await this.factsService.findAll();
  }

  @ApiOkResponse({ type: Fact })
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Find a user with a specific id' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Fact> {
    return await this.factsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit a user with a specific id' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFactDto: UpdateFactDto,
  ): Promise<void> {
    await this.factsService.update(id, updateFactDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user with a specific id' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.factsService.remove(id);
  }
}
