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
        private readonly tokenService: TokenService,
        private readonly usersService: UsersService,
    ) {}
    
    async handleConnection(client: Socket) {
        const authUser = await this.auth(client.handshake.headers);
        this.connections.set(authUser.id, client.id);

        this.logger.log(`Client connected: ${client.id}`)
    }

    handleDisconnect(client: Socket) {
        const connectionKey = this.getKeyByValue(this.connections, client.id);
        this.connections.delete(connectionKey);

        this.logger.log(`Client disconnected: ${client.id}`)
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: messageProps): void {
        this.server.to(this.connections.get(data.targetId)).emit('message', data);
    }
    
    getKeyByValue(object, value: string) {
        let keyArr = [...object.keys()];        
        return keyArr.find(key => object.get(key) == value);
    }
      
    async auth(query): Promise<User> {
        if ('x-jwt' in query) {
            const token = query['x-jwt'];

            try {
                const decoded = this.tokenService.verify(token.toString());

                if (
                    typeof decoded === 'object' &&
                    decoded.hasOwnProperty('id')
                ) {
                    const { user } = await this.usersService.userFindById(
                        decoded['id'],
                    );

                    return user;
                }
            } catch (e) {
                if (e.name === 'TokenExpiredError') {
                    throw new TokenExpiredException();
                }
            }
        }
    }    
}
