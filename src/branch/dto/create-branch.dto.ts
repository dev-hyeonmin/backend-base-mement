import { PartialType } from "@nestjs/swagger";
import { Branch } from "../entities/branch.entity";

export class CreateBranchInput extends PartialType(Branch) {}