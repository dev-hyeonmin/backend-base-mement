import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AllowedRoles } from './roles.decorator';
import { TokenInvaildException } from 'src/common/errors';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        // private readonly userService: UsersService,
    ) { }

    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<AllowedRoles>(
            'roles',
            context.getHandler(),
        );
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (user) {
            if (roles.includes('Any')) {
                return true;
            }

            return roles.includes(user.role);
        } else {
            throw new TokenInvaildException;
        }
    }
}
