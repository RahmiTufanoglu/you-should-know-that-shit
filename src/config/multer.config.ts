import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';

//TODO
@Injectable()
class MulterConfigService implements MulterOptionsFactory {

  createMulterOptions(): MulterModuleOptions {
    return {
      dest: './upload',
    };
  }

}
