import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ObjectNotFoundException } from '../exceptions/object-not-found-exception';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, username } = createUserDto;
    const userByEmail = await this.userRepository.findOne({ email });
    const userByUsername = await this.userRepository.findOne({ username });

    if (userByEmail) {
      throw new HttpException('Email exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    if (userByUsername) {
      throw new HttpException('Username exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newUser = new User();
    Object.assign(newUser, createUserDto);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.getUserById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    if (!!await this.getUserById(id)) {
      return this.userRepository.update(id, updateUserDto);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    if (!!await this.getUserById(id)) {
      return this.userRepository.delete(id);
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (err) {
      throw new ObjectNotFoundException({ id });
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(
        { email },
        { select: ['id', 'createdAt', 'username', 'firstname', 'lastname', 'email', 'password', 'highscore'] },
      );
    } catch (err) {
      throw new ObjectNotFoundException({ email });
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(
        { username },
        { select: ['id', 'createdAt', 'username', 'firstname', 'lastname', 'email', 'password', 'highscore'] },
      );
    } catch (err) {
      throw new ObjectNotFoundException({ username });
    }
  }

}
