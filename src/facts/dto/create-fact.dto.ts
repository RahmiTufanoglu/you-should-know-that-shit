import { IsDefined, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateFactDto {

  @ApiModelProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly fact: string;

  @ApiModelProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly correct: boolean;

  @ApiModelProperty()
  readonly image: string;

  @ApiModelProperty()
  readonly imageLink: string;

  @ApiModelProperty()
  readonly source: string;

  @ApiModelProperty()
  readonly createdAt: Date;

  @ApiModelProperty()
  readonly updatedAt: Date;

  @ApiModelProperty()
  readonly categoryId: string;

}
