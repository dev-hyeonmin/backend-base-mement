import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { ReservationLimitCount } from 'src/reservation/entities/reservationLimitCount.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Category extends CoreEntity {
    @Column({type: String})
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: '분류명',
        example: '보톡스',
    })
    name: string;

    @Column({ type: Boolean, default: false })
    isDelete: boolean;

    @OneToMany(() => Product, (product) => product.category)
    products?: Product[];

    @OneToMany(() => ReservationLimitCount, (count) => count.category)
    limitCounts?: ReservationLimitCount[];
}