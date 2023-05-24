import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { TokenModuleOptions } from './token.interface';

@Injectable()
export class TokenService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly option: TokenModuleOptions,
        private readonly jwtService: JwtService,
    ) {}

    sign(id: number): string {
        return this.jwtService.sign(
            { id: id },
            {
                privateKey: this.option.privateKey,
                expiresIn: this.option.expiresIn,
            },
        );
    }

    verify(token: string) {
        if (!token) return null;
        return this.jwtService.verify(token, {
            secret: this.option.privateKey,
        });
    }
}
