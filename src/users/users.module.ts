import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLoggerMiddleware } from './middleware/user-logger.middleware';
import { User } from './entities/user.entity';

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
