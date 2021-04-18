import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class LoginUserDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(300)
  readonly email: string;

  @ApiModelProperty({ minLength: 4 })
  @IsNotEmpty()
  @MinLength(4)
  readonly password: string;
}
