import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty } from 'class-validator';

export class CreateClaimDto {

  @ApiModelProperty()
  @IsNotEmpty()
  readonly claim: string;

  @ApiModelProperty()
  readonly createdDate: Date;

}
