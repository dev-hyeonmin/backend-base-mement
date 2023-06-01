
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Message } from '../entities/message.entity';

export class GetMessagesOutput {
    messages: Message[];
}

export class CreateMessageInput extends PickType(Message, ['content', 'boardId']) { }
