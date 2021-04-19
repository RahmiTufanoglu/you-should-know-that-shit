import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Claim } from './entities/claim.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {
  }

  @ApiCreatedResponse({ type: Claim })
  @Post()
  async create(@Body() createClaimDto: CreateClaimDto, @Res() res): Promise<any> {
    const claim = await this.claimsService.create(createClaimDto);
    return res.json({
      message: 'Claim has been added successfully',
      claim,
    });
  }

  @ApiOkResponse({ type: Claim, isArray: true })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() res): Promise<any[]> {
    const claims = await this.claimsService.findAll();
    return res.json({
      message: 'All claims have been found successfully',
      claims,
    });
  }

  @ApiOkResponse({ type: Claim })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res): Promise<any> {
    const claim = await this.claimsService.findOne(id);
    return res.json({
      message: `Claim with id #${id} has been found successfully.`,
      claim,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateClaimDto: UpdateClaimDto, @Res() res): Promise<any> {
    const claim = await this.claimsService.update(id, updateClaimDto);
    return res.json({
      message: `Claim with the id #${id} has been updated successfully.`,
      claim,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res): Promise<any> {
    const claim = await this.claimsService.remove(id);
    return res.json({
      message: `Claim with the id #${id} has been deleted successfully.`,
      claim,
    });
  }
}
