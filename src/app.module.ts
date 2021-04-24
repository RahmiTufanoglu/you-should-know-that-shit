import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FactsModule } from './facts/facts.module';
import { ClaimsModule } from './claims/claims.module';
import { CategoriesModule } from './categories/categories.module';
import { typeOrmConfigAsync } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.development.env', '.production.env'],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    UsersModule,
    CategoriesModule,
    FactsModule,
    ClaimsModule,
    AuthModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {
}
