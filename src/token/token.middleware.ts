import {
    Injectable,
    NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TokenService } from './token.service';
import { UsersService } from 'src/users/users.service';
import { TokenExpiredException } from 'src/common/errors';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    constructor(
        private readonly tokenService: TokenService,
        private readonly userService: UsersService,
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        if ('x-jwt' in req.headers) {
            const token = req.headers['x-jwt'];
            try {
                const decoded = this.tokenService.verify(token.toString());
                if (
                    typeof decoded === 'object' &&
                    decoded.hasOwnProperty('id')
                ) {
                    const { user } = await this.userService.userFindById(
                        decoded['id'],
                    );
                    req['user'] = user;
                }
            } catch (e) {
                if (e.name === 'TokenExpiredError') {
                    throw new TokenExpiredException();
                }

                console.log(e);
            }
        }
        next();
    }
}
