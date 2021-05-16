import { Controller, Get, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { LoginWithResponseData } from './interface/request-data.interface';
import { RequestWithUser } from './interface/request-with-user.interface';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async login(@Request() req: RequestWithUser): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: ExpressRequest): Express.User {
    return req.user;
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async signInWithGoogle(): Promise<HttpStatus> {
    return HttpStatus.OK;
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  async signInWithGoogleRedirect(@Req() req: ExpressRequest): Promise<LoginWithResponseData> {
    return this.authService.signInWith(req);
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('facebook')
  async signInWithFacebook(): Promise<HttpStatus> {
    return HttpStatus.OK;
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('facebook/redirect')
  async signInWithFacebookRedirect(@Req() req: ExpressRequest): Promise<LoginWithResponseData> {
    return this.authService.signInWith(req);
  }

  responseData(statusCode: HttpStatus, data: Express.User): LoginWithResponseData {
    return { statusCode, data };
  }

}
