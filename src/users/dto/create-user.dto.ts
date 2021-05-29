import { IsBoolean, IsDefined, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { MESSAGES, REGEX } from '../../app.utils';

export class CreateUserDto {

  @ApiModelProperty({ required: true })
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(300)
  readonly email: string;

  @ApiModelProperty({ required: true, minLength: 4 })
  @IsDefined()
  @IsNotEmpty()
  @MinLength(4)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  readonly password: string;

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
  readonly createdDate: Date;

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
