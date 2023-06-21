import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { PaymentProduct } from './payment_product.entity';

export enum PaymentType {
    Card = 1,
    Cash = 2,
    Pay = 3,
    Refund = 99
}

@Entity()
export class Payment extends CoreEntity {
    @IsNotEmpty()
    @Column({ type: Number })
    @ApiProperty({
        type: Number,
        description: '총 결제 금액',
        example: 99000,
    })
    price: number;

    @Column({ type: 'enum', enum: PaymentType, default: PaymentType.Card })
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: '결제 타입 : 1: Card / 2: Cash / 3: Pay',
        example: PaymentType.Card,
    })
    type: PaymentType;

    @IsNotEmpty()
    @Column({ type: 'datetime', comment: '수납 일자' })
    @ApiProperty({
        type: String,
        description: '수납 일자',
        example: '2023-01-01 10:00:00',
    })
    storageAt: Date;

    @ManyToOne(() => Reservation, reservation => reservation.payments)
    reservation: Reservation;

    @RelationId((payment: Payment) => payment.reservation)
    @ApiProperty({
        type: Number,
        description: '예약 ID',
        example: 1,
    })
    reservationId: number;

    @OneToMany(() => PaymentProduct, (product) => product.payment)
    products?: PaymentProduct[];
}