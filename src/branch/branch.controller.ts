import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchInput } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { findAllBranchOutput, findBranchOutput } from './dto/find-branch.dto';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  async create(@Body() createBranchDto: CreateBranchInput) {
    return await this.branchService.create(createBranchDto);
  }

  @Get()
  async findAll():Promise<findAllBranchOutput> {
    return await this.branchService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<findBranchOutput> {
    return await this.branchService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return await this.branchService.update(+id, updateBranchDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.branchService.remove(+id);
  }
}
