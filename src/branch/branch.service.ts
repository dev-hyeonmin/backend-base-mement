import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataNotFoundException } from 'src/common/errors';
import { Repository } from 'typeorm';
import { CreateBranchInput } from './dto/create-branch.dto';
import { findAllBranchOutput, findBranchOutput } from './dto/find-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { BranchInfo } from './entities/branch-info.entity';
import { Branch } from './entities/branch.entity';

@Injectable()
export class BranchService {
    constructor(
        @InjectRepository(Branch)
        private readonly branches: Repository<Branch>,
        @InjectRepository(BranchInfo)
        private readonly branchesInfo: Repository<BranchInfo>,
    ) { }

    async create({ name, nameEng, address, callNumber, kakaoID, lineID, weChatID }: CreateBranchInput) {
        try {

            const branchInfo = await this.branchesInfo.save(
                this.branchesInfo.create({ address, callNumber, kakaoID, lineID, weChatID })
            );

            await this.branches.save(
                this.branches.create({ name, nameEng, info: branchInfo })
            );

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
            const branch = await this.branches.findOne({
                where: { id },
                relations: ['info']
            });
            return { branch }
        } catch (error) {

        }
    }

    async update(id: number, { name, nameEng, address, callNumber, kakaoID, lineID, weChatID }: UpdateBranchDto) {
        try {
            const branch = await this.branches.findOne({
                where: { id },
                relations: ['info']
            });

            if (!branch) {
                throw new DataNotFoundException();
            }

            // if (name) {
            //     branch.name = name;
            // }
            // if (nameEng) {
            //     branch.nameEng = nameEng;
            // }
            // await this.branches.save(branch);

            const branchInfo = branch.info;
            if (address) {
                branchInfo.address = address;
            }
            if (callNumber) {
                branchInfo.callNumber = callNumber;
            }
            if (kakaoID) {
                branchInfo.kakaoID = kakaoID;
            }
            if (lineID) {
                branchInfo.lineID = lineID;
            }
            if (weChatID) {
                branchInfo.weChatID = weChatID;
            }
            await this.branchesInfo.save(branchInfo);

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
