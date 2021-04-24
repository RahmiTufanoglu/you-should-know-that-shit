import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IdNotFoundException } from '../exceptions/id-not-found-exception';
import { EmailNotFoundException } from '../exceptions/email-not-found-exception';
import { UsernameNotFoundException } from '../exceptions/username-not-found-exception';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  async create(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(this.getUser(new User(), user));
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return await this.getUserById(id);
  }

  async update(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    if (!!await this.getUserById(id)) {
      return this.userRepository.update(id, this.getUser(new User, user));
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    if (!!await this.getUserById(id)) {
      return this.userRepository.delete(id);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(
        { email },
        { select: ['id', 'createdAt', 'username', 'firstname', 'lastname', 'email', 'password', 'highscore'] },
      );
    } catch (err) {
      throw new EmailNotFoundException(email);
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(
        { username },
        { select: ['id', 'createdAt', 'username', 'firstname', 'lastname', 'email', 'password', 'highscore'] },
      );
    } catch (err) {
      throw new UsernameNotFoundException(username);
    }
  }

  getUser(currentUser: User, user: CreateUserDto | UpdateUserDto): User {
    currentUser.email = user.email;
    currentUser.password = user.password;
    currentUser.username = user.username ?? null;
    currentUser.firstname = user.firstname ?? null;
    currentUser.lastname = user.lastname ?? null;
    currentUser.highscore = user.highscore ?? null;
    return currentUser;
  }

  async getUserById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (err) {
      throw new IdNotFoundException(id);
    }
  }

}
