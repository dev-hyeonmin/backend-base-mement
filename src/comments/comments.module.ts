import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Board } from 'src/boards/entities/board.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Comment, Board])],
    controllers: [CommentsController],
    providers: [CommentsService]
})
export class CommentsModule { }
