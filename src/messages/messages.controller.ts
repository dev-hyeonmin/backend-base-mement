import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageInput, GetMessagesOutput } from './dtos/messages.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';

@Controller('messages')
export class MessagesController {
    constructor(
        private readonly messagesService: MessagesService
    ) { }

    @Get()
    @Roles(['Any'])
    async getMessages(@AuthUser() user: User): Promise<GetMessagesOutput> {
        const result = await this.messagesService.getMessages(user);
        return result;
    }

    @Post()
    @Roles(['Any'])
    async createMessage(
        @AuthUser() user: User,
        @Body() createMessageInput: CreateMessageInput,
    ): Promise<void> {
        const result = await this.messagesService.createMessage(user.id, createMessageInput);
        return result;
    }
}
