import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { FindOptionsOrder, Repository } from 'typeorm';
import { MyWebSocketGateway } from 'src/websockets/my-websocket.gateway';
import { User } from 'src/users/entities/user.entity';
import { CreateMessageInput, GetMessagesOutput } from './dtos/messages.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { DEFAULT_TAKE } from 'src/common/common.constants';
import { BoardsService } from 'src/boards/boards.service';
import { DataNotFoundException, UserNotFoundException } from 'src/common/errors';
import { Board } from 'src/boards/entities/board.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly messages: Repository<Message>,
        @InjectRepository(Board)
        private readonly boards: Repository<Board>,
        @InjectRepository(User)
        private readonly users: Repository<User>,
        private readonly socket: MyWebSocketGateway,
        private readonly pagination: PaginationService
    ) { }

    async getMessages(user: User): Promise<GetMessagesOutput> {
        try {
            const order: FindOptionsOrder<Message> = { createAt: "DESC" };
            const messages = await this.pagination.getList<Message>(this.messages, 10, 1, null, order);

            return { messages };
        } catch (error) {
            throw error;
        }
    }

    async createMessage(userId: number, { content, boardId }: CreateMessageInput): Promise<void> {
        try {
            const user = await this.users.findOneBy({id: userId});
            if (!user) {
                throw new UserNotFoundException;
            }

            const board = await this.boards.findOneBy({ id: boardId });
            if (!board) {
                throw DataNotFoundException;
            }

            await this.messages.save(this.messages.create({ user, content, board }));

            this.socket.handleMessage({
                userId: user.id,
                boardId: boardId,
                message: content,

            });
        } catch (error) {
            throw error;
        }
    }
}
