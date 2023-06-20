import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { ReservationLimitCount } from "../../reservation/entities/reservationLimitCount.entity";
import { json } from "stream/consumers";

export class GetReservationLimitCountsOuput {
    @ApiProperty({
        type: [ReservationLimitCount],
        description: '요일 & 날짜순으로 정렬됩니다.'
    })
    reservationLimitCounts: ReservationLimitCount[]
}

export class UpdateReservationLimitCountsInput {
    @ApiProperty({
        type: [ReservationLimitCount],
    })
    reservationLimitCounts: ReservationLimitCount[]
}

export class GetAvailableTimesInput {
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

class GetAvailableTimesOuputExample {
    @ApiProperty({
        type: String,
        description: '시간',
        example: "09:00",
    })
    time: string

    @ApiProperty({
        type: Boolean,
        description: '카테고리별 예약 가능 여부 / categoryId는 숫자로 표기',
        example: true,
    })
    categoryId: boolean
}

export class GetAvailableTimesOuput {
    @ApiProperty({
        type: [GetAvailableTimesOuputExample],
        description: '예약 가능한 시간 리스트',
    })
    times: []
}