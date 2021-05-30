import { ConflictException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ObjectNotFoundException } from '../exceptions/object-not-found-exception';
import { SocialUserDto } from './dto/social-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const userByEmail = await this.userRepository.findOne({ email });

    if (userByEmail) {
      this.logger.verbose(`Email ${email} already exists`);
      throw new ConflictException(`Email ${email} already exists`);
    }

    const newUser = new User();
    Object.assign(newUser, createUserDto);
    return this.userRepository.save(newUser);
  }

  async createSocial(socialUserDto: SocialUserDto): Promise<User> {
    const { email } = socialUserDto;
    const userByEmail = await this.userRepository.findOne({ email });

    if (userByEmail) {
      this.logger.verbose(`Email ${email} already exists`);
      throw new HttpException('Email exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return this.userRepository.save(socialUserDto);
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

  async findByEmail(email: string, isSignedInWith?: boolean): Promise<User> {
    if (!isSignedInWith) {
      try {
        return await this.userRepository.findOneOrFail({ email });
      } catch (err) {
        throw new ObjectNotFoundException({ email });
      }
    } else {
      return this.userRepository.findOne({ email });
    }
  }

}
