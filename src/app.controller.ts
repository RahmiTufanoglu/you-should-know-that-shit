import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/guard/authenticated.guard';

@Controller()
@UseGuards(AuthenticatedGuard)
export class AppController {

  constructor(private readonly appService: AppService) {
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

}
