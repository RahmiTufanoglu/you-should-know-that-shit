import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateFactDto {

  @ApiModelProperty()
  @IsNotEmpty()
  readonly fact: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly isTrue: boolean;

  @ApiModelProperty()
  readonly image: string;

  @ApiModelProperty()
  readonly createdDate: Date;

}
