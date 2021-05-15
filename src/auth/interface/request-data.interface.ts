import { HttpStatus } from '@nestjs/common';

export interface LoginWithResponseData {
  statusCode: HttpStatus;
  data: Express.User;
}
