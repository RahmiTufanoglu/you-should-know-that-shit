import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiCreatedResponse({ type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res): Promise<User> {
    const user = await this.usersService.create(createUserDto);
    return res.json({
      message: 'User has been added successfully',
      user,
    });
  }

  @ApiOkResponse({ type: User, isArray: true })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() res): Promise<User[]> {
    const users = await this.usersService.findAll();
    return res.json({
      message: 'All users have been found successfully',
      users,
    });
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res): Promise<User> {
    const user = await this.usersService.findOne(id);
    return res.json({
      message: `User with id #${id} has been found successfully.`,
      user,
    });
  }


  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @Res() res): Promise<void> {
    const user = await this.usersService.update(id, updateUserDto);
    return res.json({
      message: `User with the id #${id} has been updated successfully.`,
      user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res): Promise<void> {
    const user = await this.usersService.remove(id);
    return res.json({
      message: `User with the id #${id} has been deleted successfully.`,
      user,
    });
  }

  @ApiCreatedResponse({ type: User })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findByEmail(@Param('email') email: string, @Res() res): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    return res.json({
      message: `User with the email #${email} has been found successfully.`,
      user,
    });
  }

  @ApiCreatedResponse({ type: User })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findByUsername(@Param('username') username: string, @Res() res): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    return res.json({
      message: `User with the username #${username} has been found successfully.`,
      user,
    });
  }
}
