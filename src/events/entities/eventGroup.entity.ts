import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class EventGroup extends CoreEntity {
    @Column({type: String})
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: '이벤트명',
        example: '[이벤트] Allergan Botox 타이트닝',
    })
    name: string;

    @ManyToMany(type => Product, { eager: true, onDelete: 'CASCADE' })
    @JoinTable({ name: 'event_group_products' })
    @ApiProperty({
        type: [Product],
        description: '상품 배열',
        example: [],
    })
    products: Product[];

    // @ManyToOne(() => EventCha, cha => cha.groups)
    // cha: EventCha;
}