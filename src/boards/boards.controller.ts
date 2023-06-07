import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Roles } from 'src/auth/roles.decorator';
import { CreateBoardInput, DeleteBoardInput, EditBoardInput, GetBoardOutput, GetBoardsOutput } from '../boards/dtos/boards.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Board } from './entities/board.entity';

@Controller('boards')
export class BoardsController {
    constructor(
        private readonly boardService: BoardsService
    ) { }

    @Get()
    async getBoards(@Query('page') page?: string): Promise<GetBoardsOutput<Board>> {
        return this.boardService.getBoards(+page);
    }

    @Get(':id')
    async getBoard(@Param('id') id: number): Promise<GetBoardOutput> {
        return this.boardService.getBoardById(id);
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
