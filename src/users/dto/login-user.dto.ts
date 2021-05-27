import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDefined, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginUserDto extends PartialType(CreateUserDto) {

  @ApiModelProperty({ required: true })
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty({ required: true })
  @IsDefined()
  @IsNotEmpty()
  readonly password: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  readonly username: string;

}
