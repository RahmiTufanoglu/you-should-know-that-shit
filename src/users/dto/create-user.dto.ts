import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateUserDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(300)
  readonly email: string;

  @ApiModelProperty({ minLength: 4 })
  @IsNotEmpty()
  @MinLength(4)
  readonly password: string;

  @ApiModelProperty()
  readonly createdDate: Date;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  readonly firstname: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastname: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  readonly username: string;
}
