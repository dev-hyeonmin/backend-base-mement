import { PartialType } from "@nestjs/swagger";
import { BranchInfo } from "../entities/branch-info.entity";

export class CreateBranchInput extends PartialType(BranchInfo) {
    name: string;
    nameEng: string;
}