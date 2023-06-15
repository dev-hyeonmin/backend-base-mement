import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Timetable } from "../entities/Timetable.entity";
import { Holiday } from "../entities/holiday.entity";

export class GetTimetablesInput {
    @ApiProperty({
        type: String,
        description: '카테고리 ID / 쉼표(,)로 구분',
        example: "1,10,9",
        nullable: false
    })
    categories?: string

    @ApiProperty({
        type: String,
        description: '날짜',
        example: "2023-01-01",
    })
    date: string
}

export class GetTimetablesOuput {
    @ApiProperty({
        type: [Timetable],
        description: '요일 & 날짜순으로 정렬됩니다.'
    })
    timetables: Timetable[]
}

export class CreateTimetablesInput {
    @ApiProperty({
        type: [Timetable],
        description: ''
    })
    timetables: Timetable[]
}

export class UpdateTimetablesInput extends PickType(PartialType(Timetable), ['count']) { }

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