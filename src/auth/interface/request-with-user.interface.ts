import { Request } from 'express';
import { User } from '../../users/entities/user';

export interface RequestWithUser extends Request {
  user: User;
}
