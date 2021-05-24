import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { FACT_CATEGORY_ENUM } from '../../enums';

@Injectable()
export class CategoryValidationPipe implements PipeTransform {

  transform(value: any): any {
    // this.getEnumId(value);
    //
    // if (!this.getEnumId(value)) {
    //   throw new HttpException('Category not available', HttpStatus.BAD_REQUEST);
    // }

    return value;
  }

  getEnumId(category: string): number {
    switch (category) {
      case FACT_CATEGORY_ENUM.History:
        return 3;
      case FACT_CATEGORY_ENUM.Sport:
        return 2;
      case FACT_CATEGORY_ENUM.Politics:
        return 1;
      case FACT_CATEGORY_ENUM.Science:
        return 4;
      default:
        break;
    }
  }

}
