import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, RelationId } from 'typeorm';
import { Payment } from './payment.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class PaymentProduct extends CoreEntity {
    @IsNotEmpty()
    @Column({ type: Number })
    @ApiProperty({
        type: Number,
        description: '금액',
        example: 9000,
    })
    price: number;

    @ManyToOne(() => Payment, payment => payment.products)
    payment: Payment;

    @RelationId((paymentProduct: PaymentProduct) => paymentProduct.payment)
    @ApiProperty({
        type: Number,
        description: '결제 ID',
        example: 1,
    })
    paymentId: number;

    @ManyToOne(() => Product, product => product.paymentProducts)
    product: Product;

    @RelationId((paymentProduct: PaymentProduct) => paymentProduct.product)
    @ApiProperty({
        type: Number,
        description: '상품 ID',
        example: 1,
    })
    productId: number;
}