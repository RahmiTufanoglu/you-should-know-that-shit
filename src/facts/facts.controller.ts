import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FactsService } from './facts.service';
import { Fact } from './entities/fact.entity';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiTags('facts')
@Controller('facts')
export class FactsController {

  constructor(private readonly factsService: FactsService) {
  }

  @ApiCreatedResponse({ type: Fact })
  @ApiOperation({ summary: 'Create a fact with an image' })
  // @UseInterceptors(
  //   FileInterceptor('file', { storage }),
  // )
  @Post()
  async create(@Body() createFactDto: CreateFactDto,
               // @UploadedFile() file: Express.Multer.File,
               @Res() res,
  ): Promise<any> {
    const fact = await this.factsService.create(createFactDto);
    // const body = { fact, file: file.buffer.toString() };
    return res.json({
      message: 'Fact has been added successfully',
      // body,
      fact,
    });
  }

  @ApiOkResponse({ type: Fact, isArray: true })
  @ApiOperation({ summary: 'Show all users' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get()
  async findAll(): Promise<Fact[]> {
    return await this.factsService.findAll();
  }

  @ApiOkResponse({ type: Fact })
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Find a user with a specific id' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Fact> {
    return await this.factsService.findById(id);
  }

  @ApiOperation({ summary: 'Edit a user with a specific id' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateFactDto: UpdateFactDto): Promise<UpdateResult> {
    return await this.factsService.update(id, updateFactDto);
  }

  @ApiOperation({ summary: 'Delete a user with a specific id' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return await this.factsService.remove(id);
  }

}
