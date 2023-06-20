import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Holiday } from "../entities/holiday.entity";

export class GetHolidaysOuput {
    @ApiProperty({
        type: [Holiday],
        description: '휴무일 리스트'
    })
    holidays: Holiday[]
}

export class CreateHolidayInput {
    @ApiProperty({
        type: [String],
        description: '휴무일 날짜',
        example: ['2023-01-01', '2023-05-05']
    })
    holiday: String[]
}