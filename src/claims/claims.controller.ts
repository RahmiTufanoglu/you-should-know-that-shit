import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ClaimEntity } from './entities/claim.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { SETTINGS } from '../app.utils';
// import { Claim } from './interfaces/claim.interface';

@Controller('claims')
@UseGuards(JwtAuthGuard)
export class ClaimsController {

  constructor(private readonly claimsService: ClaimsService) {
  }

  @ApiCreatedResponse({ type: ClaimEntity })
  @Post()
  async create(@Body(SETTINGS.VALIDATION_PIPE) createClaimDto: CreateClaimDto): Promise<ClaimEntity> {
    return this.claimsService.create(createClaimDto);
  }

  @ApiOkResponse({ type: ClaimEntity, isArray: true })
  @UsePipes(ValidationPipe)
  @Get()
  async findAll(): Promise<ClaimEntity[]> {
    return this.claimsService.findAll();
  }

  @ApiOkResponse({ type: ClaimEntity })
  @ApiNotFoundResponse()
  @UsePipes(ValidationPipe)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<ClaimEntity> {
    return this.claimsService.findById(id);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateClaimDto: UpdateClaimDto,
  ): Promise<UpdateResult> {
    return this.claimsService.update(id, updateClaimDto);
  }

  @UsePipes(ValidationPipe)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.claimsService.remove(id);
  }

}
