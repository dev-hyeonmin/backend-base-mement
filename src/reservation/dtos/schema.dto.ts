import { Reservation } from "../entities/reservation.entity";
import { ApiProperty } from "@nestjs/swagger";
  
export class getReservationsSchema {
    @ApiProperty({
        type: [Reservation],
        description: "전체 데이터 수"
    })
    reservations: Reservation[];

    @ApiProperty({
        description: "전체 데이터 수",
        example: 100
    })
    total: number;

    @ApiProperty({
        description: "현재 페이지",
        example: 1,
    })
    currentPage: number;

    @ApiProperty({
        description: "전체 페이지 수",
        example: 10,
    })
    lastPage: number;
};

export class getReservationSchema {
    @ApiProperty({
        type: Reservation,
        description: "예약 정보"
    })
    reservation: Reservation;
};