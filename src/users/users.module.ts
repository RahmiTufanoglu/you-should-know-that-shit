import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserLoggerMiddleware } from './middleware/user-logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
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
