import { HttpException, HttpStatus } from '@nestjs/common';

interface ErrorObject {
  id?: number | string;
  email?: string;
  username?: string;
}

export class IdNotFoundException extends HttpException {

  constructor(error: ErrorObject) {
    let errorMessage: string;
    switch (error) {
      case error.id:
        errorMessage = `ID ${error.id} not found.`;
        break;
      case error.email:
        errorMessage = `Email ${error.email} not found.`;
        break;
      case error.username:
        errorMessage = `Username ${error.username} not found.`;
        break;
      default:
        errorMessage = 'Not found.';
        break;
    }
    super(errorMessage, HttpStatus.NOT_FOUND);
    // super(`Id ${id} not found`, HttpStatus.NOT_FOUND);
  }

}
