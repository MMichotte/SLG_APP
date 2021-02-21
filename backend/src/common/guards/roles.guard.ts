import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EUserRoles } from '../../models/users/constants/user-roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
      
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (user.role === EUserRoles.DEV) return true; //DEV user has all rights
    
    if (!roles) {
      return false;
    }

    return this.matchRoles(roles, user.role);
  }

  private matchRoles(roles: string[], role: string): boolean {
    const hasRole = roles.find((r) => { return r === role; });
    if (hasRole.length !== 0) return true;
    return false;
  }

}