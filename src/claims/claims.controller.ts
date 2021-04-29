import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Claim } from './entities/claim.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { SETTINGS } from '../app.utils';

@Controller('claims')
export class ClaimsController {

  constructor(private readonly claimsService: ClaimsService) {
  }

  @ApiCreatedResponse({ type: Claim })
  @Post()
  async create(@Body(SETTINGS.VALIDATION_PIPE) createClaimDto: CreateClaimDto): Promise<Claim> {
    return this.claimsService.create(createClaimDto);
  }

  @ApiOkResponse({ type: Claim, isArray: true })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get()
  async findAll(): Promise<Claim[]> {
    return this.claimsService.findAll();
  }

  @ApiOkResponse({ type: Claim })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Claim> {
    return this.claimsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateClaimDto: UpdateClaimDto): Promise<UpdateResult> {
    return this.claimsService.update(id, updateClaimDto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.claimsService.remove(id);
  }

}
