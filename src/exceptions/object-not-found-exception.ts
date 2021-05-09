import { HttpException, HttpStatus } from '@nestjs/common';

export class ObjectNotFoundException extends HttpException {

  constructor(error: any) {
    const key = Object.keys(error);
    let errorMessage: string;
    switch (true) {
      case key[0] === 'id':
        errorMessage = `ID ${error.id} not found.`;
        break;
      case key[0] === 'category':
        errorMessage = `Category ${error.category} not found.`;
        break;
      case key[0] === 'email':
        errorMessage = `Email ${error.email} not found.`;
        break;
      case key[0] === 'username':
        errorMessage = `Username ${error.username} not found.`;
        break;
      default:
        errorMessage = 'Not found.';
        break;
    }
    super(errorMessage, HttpStatus.NOT_FOUND);
  }

}
