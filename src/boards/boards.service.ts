import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardInput, EditBoardInput, GetBoardsOutput } from '../boards/dtos/boards.dto';
import { SubCategory } from 'src/categories/entities/subCategory.entity';
import { DataNotFoundException, UserNotFoundException, ValidationException } from 'src/common/errors';
import { User } from 'src/users/entities/user.entity';
import { PaginationService } from 'src/pagination/pagination.service';
import { DEFAULT_TAKE } from 'src/common/common.constants';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private readonly boards: Repository<Board>,
        @InjectRepository(SubCategory)
        private readonly subCategories: Repository<SubCategory>,
        @InjectRepository(User)
        private readonly users: Repository<User>,
        private readonly pagination: PaginationService
    ) { }

    async getBoards(page: number): Promise<GetBoardsOutput> {
        try {
            if (!page) {
                page = 1;
            }

            const boardList = await this.pagination.getList<Board>(this.boards, DEFAULT_TAKE, page);

            return { boards: boardList };
        } catch (error) {
            throw error;
        }
    }

    async createBoard(user: User, {title, content, subCategoryId} : CreateBoardInput) {
        try {
            if (!user) {
                throw new UserNotFoundException;
            }

            const subCategory = await this.subCategories.findOneBy({ id: subCategoryId });
            if (!subCategory) {
                throw new DataNotFoundException;
            }                        


            await this.boards.save(this.boards.create({
                title,
                content,
                subCategory: subCategory.id,
                userId: user.id
            }));
        } catch (error) {
            throw error;
        }
    }

    async editBoard(id: number, { title, content, subCategoryId }: EditBoardInput) {
        try {
            const board = await this.boards.findOneBy({ id });
            if (!board) {
                throw new DataNotFoundException;
            }

            if (title) {
                board.title = title;
            }
            if (content) {
                board.content = content;
            }
            if (subCategoryId) {
                board.subCategory = subCategoryId;
            }

            await this.boards.save(board);
        } catch (error) {
            throw error;
        }
    }

    async deleteBoard(userId: number, id: number) {
        try {
            const board = await this.boards.findOneBy({ id });
            if (!board) {
                throw new DataNotFoundException;
            }

            if (board.userId != userId) {
                throw new ValidationException;
            }

            await this.boards.delete({ id });
        } catch (error) {
            throw error;
        }
    }
}
