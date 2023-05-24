import { DynamicModule, Global, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenModuleOptions } from './token.interface';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({})
export class TokenModule {
    static forRoot(option: TokenModuleOptions): DynamicModule {
        return {
            module: TokenModule,
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: option,
                },
                TokenService,
                JwtService,
            ],
            exports: [TokenService],
        };
    }
}
