
import { PickType } from '@nestjs/swagger';
import { Message } from '../entities/message.entity';
import { GetListOutput } from 'src/pagination/dtos/pagination.dto';

export class GetMessagesOutput<T> {
    messages: GetListOutput<T>;
}

export class CreateMessageInput extends PickType(Message, ['content', 'boardId']) { }
