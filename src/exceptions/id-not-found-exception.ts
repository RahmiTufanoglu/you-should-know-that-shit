import { HttpException, HttpStatus } from '@nestjs/common';

export class IdNotFoundException extends HttpException {

  constructor(id: number | string) {
    super(`Id ${id} not found`, HttpStatus.NOT_FOUND);
  }

}
