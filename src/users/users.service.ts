import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  async create(user: CreateUserDto): Promise<User> {
    user = {
      ...user,
      email: user.email.toLowerCase(),
      password: await this.hashPassword(user.password),
    };
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  async update(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    user = {
      ...user,
      email: user.email.toLowerCase(),
      password: await this.hashPassword(user.password),
    };
    return this.userRepository.update(id, user);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne(
      { email },
      { select: ['id', 'createdDate', 'username', 'firstname', 'lastname', 'email', 'password'] },
    );
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne(
      { username },
      { select: ['id', 'createdDate', 'username', 'firstname', 'lastname', 'email', 'password'] },
    );
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
