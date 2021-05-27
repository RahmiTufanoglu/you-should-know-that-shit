import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ObjectNotFoundException } from '../exceptions/object-not-found-exception';
import { SocialUserDto } from './dto/social-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  // selectArr = ['id', 'createdAt', 'username', 'firstname', 'lastname', 'email', 'password', 'highscore', 'signedInWith'];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const userByEmail = await this.userRepository.findOne({ email });

    if (userByEmail) {
      throw new HttpException('Email exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newUser = new User();
    Object.assign(newUser, createUserDto);

    // try {
    //   return await this.userRepository.save(newUser);
    // } catch (error) {
    //   if (error.code === '23505') {
    //     throw new ConflictException(`Email ${email} already exists`);
    //   }
    //   throw new InternalServerErrorException();
    // }

    return this.userRepository.save(newUser);
  }

  async createSocial(socialUserDto: SocialUserDto): Promise<User> {
    const { email } = socialUserDto;
    const userByEmail = await this.userRepository.findOne({ email });

    if (userByEmail) {
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
        return await this.userRepository.findOneOrFail(
          { email },
          // { select: this.selectArr as any },
        );
      } catch (err) {
        throw new ObjectNotFoundException({ email });
      }
    } else {
      return this.userRepository.findOne({ email });
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(
        { username },
        // { select: this.selectArr as any },
      );
    } catch (err) {
      throw new ObjectNotFoundException({ username });
    }
  }

}
