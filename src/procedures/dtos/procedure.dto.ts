import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Procedure } from "../entities/Procedure.entity";

export class GetProceduresInput extends PickType(PartialType(Procedure), ['name']) {}

export class getProceduresOutput {
    @ApiProperty({
        type: [Procedure],
        description: "상품 리스트"
    })
    procedures: Procedure[];
};

export class getProcedureOutput {
    @ApiProperty({
        type: Procedure,
        description: "상품 정보"
    })
    procedure: Procedure;
};

export class CreateProcedureInput extends PickType(PartialType(Procedure), ['name']) { }

export class UpdateProcedureInput extends PickType(PartialType(Procedure),['name']) { }