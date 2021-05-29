import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class SocialUserDto {

  @ApiModelProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(300)
  readonly email: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  readonly username: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  readonly firstname: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  readonly lastname: string;

  @ApiModelProperty()
  readonly createdDate?: Date;

  @ApiModelProperty()
  readonly updatedAt: Date;

  // @ApiModelProperty()
  // @IsOptional()
  // @IsString()
  // readonly currentScore: number;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  readonly highscore: number;

  @ApiModelProperty()
  @IsOptional()
  @IsBoolean()
  readonly signedInWithSocialMedia: boolean;

}
