import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FactsModule } from './facts/facts.module';
import { ClaimsModule } from './claims/claims.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production'],
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (config: ConfigService) => ormConfig(config),
    //   inject: [ConfigService],
    // }),
    //
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('TYPEORM_HOST'),
        port: configService.get('TYPEORM_PORT'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE'),
        synchronize: false,
        entities: [
          // 'dist/src/**/*.entity{.ts,.js}',
          __dirname + '/**/*.entity{.ts,.js}',
        ],
        migrations: [
          // 'dist/src/db/migrations/*.js',
          __dirname + '/db/migrations/*js',
        ],
        cli: {
          'migrationsDir': 'src/db/migrations',
        },
      }),
      inject: [ConfigService],
    }),
    //
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.TYPEORM_HOST,
    //   port: parseInt(process.env.TYPEORM_PORT),
    //   username: process.env.TYPEORM_USERNAME,
    //   password: process.env.TYPEORM_PASSWORD,
    //   database: process.env.TYPEORM_DATABASE,
    //   synchronize: false,
    //   entities: [
    //     'dist/src/**/*.entity{.ts,.js}',
    //   ],
    //   migrations: [
    //     'dist/src/db/migrations/*.js',
    //   ],
    //   cli: {
    //     'migrationsDir': 'src/db/migrations',
    //   },
    // }),
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
