import { Module } from '@nestjs/common';
import { FactsService } from './facts.service';
import { FactsController } from './facts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { Fact } from './entities/fact.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fact]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads',
      }),
    }),
  ],
  controllers: [
    FactsController,
  ],
  providers: [
    FactsService,
  ],
})
export class FactsModule {
}
