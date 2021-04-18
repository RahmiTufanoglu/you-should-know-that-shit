import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { PartialType } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';

export class CreateUserDto extends PartialType(LoginUserDto) {
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
