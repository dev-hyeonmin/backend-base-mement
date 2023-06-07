import { Global, Module } from '@nestjs/common';
import { MyWebSocketGateway } from './my-websocket.gateway';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { TokenModule } from 'src/token/token.module';

@Global()
    @Module({
    imports: [TokenModule, UsersModule],
    providers: [MyWebSocketGateway, JwtService],
    exports: [MyWebSocketGateway]
})
export class WebsocketsModule { }
