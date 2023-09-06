import { PartialType } from '@nestjs/swagger';
import { CreateBranchInput } from './create-branch.dto';

export class UpdateBranchDto extends PartialType(CreateBranchInput) {}
