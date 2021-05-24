import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { SETTINGS } from '../app.utils';
import { DeleteResult, UpdateResult } from 'typeorm';
// import { UserEntity } from './interfaces/user.interface';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  @ApiCreatedResponse({ type: UserEntity })
  @Post()
  async create(@Body(SETTINGS.VALIDATION_PIPE) createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @ApiOkResponse({ type: UserEntity, isArray: true })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @ApiOkResponse({ type: UserEntity })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<UserEntity> {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.usersService.remove(id);
  }

  @ApiCreatedResponse({ type: UserEntity })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findByEmail(@Param('email') email: string): Promise<UserEntity> {
    return this.usersService.findByEmail(email);
  }

  @ApiCreatedResponse({ type: UserEntity })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findByUsername(@Param('username') username: string): Promise<UserEntity> {
    return this.usersService.findByUsername(username);
  }

}
