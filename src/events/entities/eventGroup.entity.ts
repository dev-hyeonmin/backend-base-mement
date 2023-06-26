import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

export enum ReservationStatus {
    Reserve = 'Reserve', // 예약
    Regist = 'Regist', // 접수
    Complete = 'Complete', // 완료
    Cancel = 'Cancel', // 취소
}

@Entity()
export class EventGroup extends CoreEntity {
    @Column({type: Date})
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: '이벤트명',
        example: '[이벤트] Allergan Botox 타이트닝',
    })
    name: Date;

    @ManyToMany(type => Product, { eager: true })
    @JoinTable({ name: 'event_group_products' })
    @ApiProperty({
        type: [Product],
        description: '상품 배열',
        example: [],
    }) 
    products: Product[]
}