import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
// import { Request } from 'express';
import { UserLoggerMiddleware } from './middleware/user-logger.middleware';

// export function checkEmailProvider(req: Request, res, next) {
//   const user: User = req.body;
//
//   if (user.email.includes('gmail')) {
//   }
//
//   next();
// }

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [
    UsersController,
  ],
  providers: [
    UsersService,
  ],
  exports: [
    UsersService,
  ],
})
export class UsersModule implements NestModule {

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(UserLoggerMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST });
  }

}
