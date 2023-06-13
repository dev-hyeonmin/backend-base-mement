import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Reservation } from "../entities/reservation.entity";

export class GetReservationsInput {
    @ApiProperty({
        description: '페이지',
        required: true,
        default: 1
    })
    page: number;

    @ApiProperty({
        description: '사용자 ID'
    })
    userId: number
}

export class CreateReservationsInput extends PickType(PartialType(Reservation), ['status', 'reserveAt', 'memo', 'items']) { 
    @ApiProperty({
        description: '예약 고객 ID',
        example: 1
    })
    userId: number
}

export class UpdateReservationsInput extends PickType(PartialType(Reservation),['status', 'reserveAt', 'memo', 'items']) { }