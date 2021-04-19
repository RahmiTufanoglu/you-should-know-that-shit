import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FactsService } from './facts.service';
import { Fact } from './entities/fact.entity';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';

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
  ): Promise<{ file: string; body: Fact }> {
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
  @Get()
  async findAll(@Res() res): Promise<any[]> {
    const facts = await this.factsService.findAll();
    return res.json({
      message: 'All facts have been found successfully',
      facts,
    });
  }

  @ApiOkResponse({ type: Fact })
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Find a user with a specific id' })
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res): Promise<any> {
    const fact = await this.factsService.findOne(id);
    return res.json({
      message: `Fact with id #${id} has been found successfully.`,
      fact,
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit a user with a specific id' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateFactDto: UpdateFactDto, @Res() res): Promise<any> {
    const fact = await this.factsService.update(id, updateFactDto);
    return res.json({
      message: `Fact with the id #${id} has been updated successfully.`,
      fact,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user with a specific id' })
  async remove(@Param('id') id: number, @Res() res): Promise<any> {
    const fact = await this.factsService.remove(id);
    return res.json({
      message: `Fact with the id #${id} has been deleted successfully.`,
      fact,
    });
  }
}
