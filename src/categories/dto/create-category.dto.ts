import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';
import { FACT_CATEGORY_ENUM } from '../../enums';

export class CreateCategoryDto {

  @ApiModelProperty()
  @IsEnum(FACT_CATEGORY_ENUM)
  // @IsIn(Object.values(FACT_CATEGORY_ENUM)) TODO
  @IsDefined()
  @IsNotEmpty()
  readonly category: FACT_CATEGORY_ENUM;

  @ApiModelProperty()
  readonly createdAt: Date;

  @ApiModelProperty()
  readonly updatedAt: Date;

}
