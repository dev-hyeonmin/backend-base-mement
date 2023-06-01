import { Global, Module } from '@nestjs/common';
import { MyWebSocketGateway } from './my-websocket.gateway';

@Global()
@Module({
    providers: [MyWebSocketGateway],
    exports: [MyWebSocketGateway]
})
export class WebsocketsModule {}
