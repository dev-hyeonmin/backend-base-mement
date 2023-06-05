import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface messageProps {
    userId: number;
    boardId: number;
    message: string;
}

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

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: messageProps): void {
        this.server.emit('message', data); // send notice
    }
}
