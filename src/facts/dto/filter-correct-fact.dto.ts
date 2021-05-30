import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDefined, IsNotEmpty } from 'class-validator';
import { FACT_CATEGORY_ENUM } from '../../enums';

export class FilterCorrectFactDto {

  @ApiModelProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly correct: boolean;

  @ApiModelProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly category: FACT_CATEGORY_ENUM;

}
