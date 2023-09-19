import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/categories/entities/Category.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Payment } from './payment.entity';

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

    @ManyToOne(() => Category, category => category.paymentProducts)
    productCategory: Product;

    // @RelationId((paymentProduct: PaymentProduct) => paymentProduct.productCategory)
    // @ApiProperty({
    //     type: Number,
    //     description: '카테고리 ID',
    //     example: 1,
    // })
    // categoryId: number;
}