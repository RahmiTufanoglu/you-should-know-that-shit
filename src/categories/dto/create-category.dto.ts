import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty } from 'class-validator';
import { FACT_CATEGORY_ENUM } from '../../enums/fact.enum';

export class CreateCategoryDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly category: FACT_CATEGORY_ENUM;

  @ApiModelProperty()
  readonly createdDate: Date;
}
