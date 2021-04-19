import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateFactDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly fact: string;

  @ApiModelProperty()
  readonly createdDate: Date;

  // @ApiModelProperty()
  // @IsNotEmpty()
  // readonly category: FACT_CATEGORY_ENUM;

  @ApiModelProperty()
  readonly image?: string;
}
