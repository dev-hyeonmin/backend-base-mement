import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Payment } from "../entities/Payment.entity";

export class GetPaymentsInput extends PickType(PartialType(Payment), ['reservationId', 'storageAt']) {}

export class GetPaymentsOutput {
    @ApiProperty({
        type: [Payment],
        description: "결제 내역 리스트"
    })
    Payments: Payment[];
};

export class GetPaymentOutput {
    @ApiProperty({
        type: Payment,
        description: "상품 정보"
    })
    Payments: Payment;
};

export class CreatePaymentInput extends PickType(PartialType(Payment), ['price', 'type', 'storageAt']) {
    @ApiProperty({ 
        type: Number,
        description: '예약 ID',
        example: 1
    })
    reservationId: Number;

    @ApiProperty({ 
        type: [Number],
        description: '상품 ID배열',
        example: [1, 9, 10]
    })
    products: Number[];
}