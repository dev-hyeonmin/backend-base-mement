import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { TokenExpiredException } from 'src/common/errors';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

interface messageProps {
    targetId: number;
    boardId: number;
    message: string;
}

@WebSocketGateway()
export class MyWebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    logger = new Logger();
    connections = new Map();
 
    constructor(
        private readonly jwtService: JwtService,
    ) {}
    
    async handleConnection(client: Socket) {
        const authUserId = await this.auth(client.handshake.query);
        this.connections.set(authUserId, client.id);
        this.logger.log(`Client connected: ${client.id}`)
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`)
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: messageProps): void {
        this.server.to(this.connections.get(data.targetId)).emit('message', data);
    }
    
    async auth(query): Promise<User> {
        if ('x-jwt' in query) {
            const token = query['x-jwt'];
            try {
                const decoded = this.jwtService.verify(token, {
                    secret: process.env.PRIVATE_KEY,
                });

                if (
                    typeof decoded === 'object' &&
                    decoded.hasOwnProperty('id')
                ) {
                    return decoded['id'];
                }
            } catch (e) {
                if (e.name === 'TokenExpiredError') {
                    throw new TokenExpiredException();
                }

                console.log(e);
            }
        }
    }    
}
