import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Roles } from 'src/auth/roles.decorator';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { CreateCommentInput, EditCommentInput, GetCommentsOutput } from './dtos/comments.dto';

@Controller('comments')
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService
    ) { }

    @Get()
    async getComment(@Query('board') boardId?: string): Promise<GetCommentsOutput> {
        return this.commentsService.getComments(+boardId);
    }

    @Post()
    @Roles(['Any'])
    async createComment(@AuthUser() user, @Body() createCommentInput: CreateCommentInput) {
        return this.commentsService.createComment(user, createCommentInput);
    }

    @Put(':id')
    @Roles(['Any'])
    async editComment(@Param('id') id: number, @Body() editCommentInput: EditCommentInput) {
        return this.commentsService.editComment(id, editCommentInput);
    }

    @Delete(':id')
    @Roles(['Any'])
    async deleteComment(@AuthUser() user, @Param('id') id: number) {
        return this.commentsService.deleteComment(user.id, id);
    }
}
