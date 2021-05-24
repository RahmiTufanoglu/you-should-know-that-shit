import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { FactsService } from './facts.service';
import { FactsController } from './facts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { Fact } from './entities/fact.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { extname } from 'path';
import { Category } from '../categories/entities/category.entity';

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    cb(new HttpException(
      `Unsupported file type ${extname(file.originalname)}`,
      HttpStatus.BAD_REQUEST,
    ), false);
  }
  cb(null, true);
};

@Module({
  imports: [
    TypeOrmModule.forFeature([Fact, Category]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        fileFilter: imageFilter,
        dest: configService.get('MULTER_DEST'),
        limits: {
          fileSize: 50 * 1024 * 1024, // f.e. 50MB
        },
        // useClass: MulterConfigService,
      }),
      // useFactory: () => ({
      //   dest: './uploads',
      // }),
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
