import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { SETTINGS } from '../app.utils';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  @ApiCreatedResponse({ type: User })
  @Post()
  async create(@Body(SETTINGS.VALIDATION_PIPE) createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @ApiOkResponse({ type: User, isArray: true })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return await this.usersService.findById(id);
  }


  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return await this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return await this.usersService.remove(id);
  }

  @ApiCreatedResponse({ type: User })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get()
  async findByEmail(@Param('email') email: string): Promise<User> {
    return await this.usersService.findByEmail(email);
  }

  @ApiCreatedResponse({ type: User })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get()
  async findByUsername(@Param('username') username: string): Promise<User> {
    return await this.usersService.findByUsername(username);
  }

}
