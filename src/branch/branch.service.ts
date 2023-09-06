import { Injectable } from '@nestjs/common';
import { CreateBranchInput } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { Repository } from 'typeorm';
import { DataNotFoundException } from 'src/common/errors';
import { findAllBranchOutput, findBranchOutput } from './dto/find-branch.dto';

@Injectable()
export class BranchService {
    constructor(
        @InjectRepository(Branch)
        private readonly branches: Repository<Branch>,
    ) { }

    async create({ name, name_eng }: CreateBranchInput) {
        try {
            await this.branches.save(
                this.branches.create({ name, name_eng })
            )

            return { ok: true };
        } catch (error) {

        }
    }

    async findAll(): Promise<findAllBranchOutput> {
        try {
            const branches = await this.branches.find({});
            return { branches }
        } catch (error) {

        }
    }

    async findOne(id: number): Promise<findBranchOutput> {
        try {
            const branch = await this.branches.findOneBy({ id });
            return { branch }
        } catch (error) {

        }
    }

    async update(id: number, { name, name_eng }: UpdateBranchDto) {
        try {
            const branch = await this.branches.findOneBy({ id });

            if (!branch) {
                throw new DataNotFoundException();
            }

            if (name) {
                branch.name = name;
            }
            if (name_eng) {
                branch.name_eng = name_eng;
            }

            await this.branches.save(branch);
        } catch (error) {

        }
    }

    async remove(id: number) {
        try {
            this.branches.delete(id);
            return { ok: true };
        } catch (error) {

        }
    }
}
