import { Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsOptional, IsString } from 'class-validator';

@Entity()
export class UpdateUserScoreDto {

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  readonly highscore: number;

}
