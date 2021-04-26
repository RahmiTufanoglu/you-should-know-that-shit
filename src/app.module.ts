import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FactsModule } from './facts/facts.module';
import { ClaimsModule } from './claims/claims.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: ['.development.env', '.production.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rahmi123',
      database: 'truthy-vs-falsy-db',
      synchronize: false,
      entities: [
        'dist/src/**/*.entity{.ts,.js}',
      ],
      migrations: [
        'dist/src/db/migrations/*.js',
      ],
      cli: {
        'migrationsDir': 'src/db/migrations',
      },
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    FactsModule,
    ClaimsModule,
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
