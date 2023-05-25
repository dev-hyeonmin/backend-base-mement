import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { SubCategory } from 'src/categories/entities/subCategory.entity';
import { User } from 'src/users/entities/user.entity';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board, SubCategory, User])],
  controllers: [BoardsController],
  providers: [BoardsService, PaginationService]
})
export class BoardsModule {}
