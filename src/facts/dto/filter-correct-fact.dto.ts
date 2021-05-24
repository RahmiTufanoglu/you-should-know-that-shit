import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class FilterCorrectFactDto {

  @ApiModelProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly isTrue: boolean;

}
