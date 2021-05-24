import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: UserEntity): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signInWith(req: any) {
    if (!req.user) {
      throw new BadRequestException();
    }

    const email = await this.usersService.findByEmail(req.user.email, true);
    if (!email) {
      const user = {
        ...req.user,
        signedInWithSocialMedia: true,
      };
      await this.usersService.createSocial(user);
    }

    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

}
