import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from 'src/common/common.constants';

@Module({
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AuthModule {}
