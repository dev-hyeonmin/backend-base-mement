import { Module } from '@nestjs/common';
import { MyWebSocketGateway } from './my-websocket.gateway';

@Module({
    providers: [MyWebSocketGateway],
})
export class WebsocketsModule {}
