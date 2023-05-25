import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateCommentInput, EditCommentInput, GetCommentsOutput } from './dtos/comments.dto';
import { DataNotFoundException, UserNotFoundException, ValidationException } from 'src/common/errors';
import { Board } from 'src/boards/entities/board.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Board)
        private readonly boards: Repository<Board>,
        @InjectRepository(Comment)
        private readonly comments: Repository<Comment>
    ) { }

    async getComments(boardId: number): Promise<GetCommentsOutput> {
        try {
            const board = await this.boards.findOneBy({ id: boardId });
            if (!board) {
                throw new DataNotFoundException;
            }  

            const commentList = await this.comments.find({
                select: {
                    id: true,
                    content: true,
                    createAt: true,
                    updateAt: true,
                    depth: true,
                    user: {
                        name: true
                    }
                },
                where: {
                    board: {
                        id: board.id
                    }
                },
                order: {
                    reference: {
                        id: "ASC"
                    },
                    depth: "ASC"
                },
                relations: ['user']
            });
            
            return { comments: commentList };
        } catch (error) {
            throw error;
        }
    }

    async createComment(user: User, {content, boardId, referenceId} : CreateCommentInput) {
        try {
            if (!user) {
                throw new UserNotFoundException;
            }

            const board = await this.boards.findOneBy({ id: boardId });
            if (!board) {
                throw new DataNotFoundException;
            }                                    
            
            const comment = await this.comments.save(this.comments.create({
                content,
                user,
                board
            }));

            // depth & ref
            if (referenceId) {
                const reference = await this.comments.findOne({ where: { id: referenceId } , relations: ['replies']});
                if (!reference) {
                    throw new DataNotFoundException;
                }  
                
                comment.depth = reference.depth + 1;
                comment.reference = reference;
            } else {
                comment.reference = comment;
            }
            await this.comments.save(comment);
        } catch (error) {
            throw error;
        }
    }

    async editComment(id: number, { content }: EditCommentInput) {
        try {
            const comment = await this.comments.findOneBy({ id });
            if (!comment) {
                throw new DataNotFoundException;
            }

            if (content) {
                comment.content = content;
            }

            await this.comments.save(comment);
        } catch (error) {
            throw error;
        }
    }

    async deleteComment(userId: number, id: number) {
        try {
            const comment = await this.comments.findOne({ where: {id}, relations: ['user'] });
            if (!comment) {
                throw new DataNotFoundException;
            }

            if (comment.user.id != userId) {
                throw new ValidationException;
            }

            await this.comments.delete({ id });
        } catch (error) {
            throw error;
        }
    }
}
