import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8080)
export class MyGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: string): string {
        console.log(data);
        return 'Hello world!';
    }

    async handleConnection() {
        
        console.log("connection");
      }
}
