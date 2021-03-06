import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreateClaimDto {

  @ApiModelProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly claim: string;

  @ApiModelProperty()
  readonly createdDate: Date;

}
