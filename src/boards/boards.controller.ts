import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Roles } from 'src/auth/roles.decorator';
import { CreateBoardInput, DeleteBoardInput, EditBoardInput, GetBoardsOutput } from '../boards/dtos/boards.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';

@Controller('boards')
export class BoardsController {
    constructor(
        private readonly boardService: BoardsService
    ) { }

    @Get()
    async getBoard(@Query('page') page?: string): Promise<GetBoardsOutput> {
        return this.boardService.getBoards(+page);
    }

    @Post()
    @Roles(['Any'])
    async createBoard(@AuthUser() user, @Body() createBoardInput: CreateBoardInput) {
        return this.boardService.createBoard(user, createBoardInput);
    }

    @Put(':id')
    @Roles(['Any'])
    async editBoard(@Param('id') id: number, @Body() editBoardInput: EditBoardInput) {
        return this.boardService.editBoard(id, editBoardInput);
    }

    @Delete(':id')
    @Roles(['Any'])
    async deleteBoard(@AuthUser() user, @Param('id') id: number) {
        return this.boardService.deleteBoard(user.id, id);
    }
}
