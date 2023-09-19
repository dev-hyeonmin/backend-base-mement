import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { BranchInfo } from './entities/branch-info.entity';
import { Branch } from './entities/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, BranchInfo])],
  controllers: [BranchController],
  providers: [BranchService]
})
export class BranchModule {}
