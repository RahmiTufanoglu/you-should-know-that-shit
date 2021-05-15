import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

//TODO:
@Injectable()
export class AuthenticatedGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }

}
