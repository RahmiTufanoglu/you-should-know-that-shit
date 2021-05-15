import { HttpStatus, ValidationPipe } from '@nestjs/common';

const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

const PASSWORD_RULE_MESSAGE =
  'Password must consists of min ' +
  '1 uppercase letter, ' +
  'min 1 lowercase letter, ' +
  'min 1 special character, ' +
  'min 1 number.' +
  'min 8 characters and ' +
  'max 30 characters.';

const VALIDATION_PIPE = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});

export const REGEX = { PASSWORD_RULE };

export const MESSAGES = { PASSWORD_RULE_MESSAGE };

export const SETTINGS = { VALIDATION_PIPE };
