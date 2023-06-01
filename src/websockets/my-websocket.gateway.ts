import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { noticeProps } from './message.interface';

@WebSocketGateway()
export class MyWebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    logger = new Logger();

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`)
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`)
    }

    @SubscribeMessage('notice')
    handleChat(@MessageBody() { userId, message }: noticeProps): void {
        this.server.emit('notice', message); // send notice
    }
}
