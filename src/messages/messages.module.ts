import { Global, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessagesController } from './messages.controller';
import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Message, Board, User])],
    providers: [MessagesService],
    controllers: [MessagesController],
    exports: [MessagesService]
})
export class MessagesModule { }
