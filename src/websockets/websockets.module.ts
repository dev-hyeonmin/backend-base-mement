import { Global, Module } from '@nestjs/common';
import { MyWebSocketGateway } from './my-websocket.gateway';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
    providers: [MyWebSocketGateway, JwtService],
    exports: [MyWebSocketGateway]
})
export class WebsocketsModule { }
