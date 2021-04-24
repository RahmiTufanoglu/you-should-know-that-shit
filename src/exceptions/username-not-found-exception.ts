import { HttpException, HttpStatus } from '@nestjs/common';

export class UsernameNotFoundException extends HttpException {

  constructor(username: string) {
    super(`Username ${username} not found`, HttpStatus.NOT_FOUND);
  }

}
