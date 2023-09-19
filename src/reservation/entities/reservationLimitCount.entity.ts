import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/categories/entities/Category.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

export enum Week {
    Sunday = 0,
    Monday = 1,
    Tuseday = 2,
    Wendsday = 3,
    Turseday = 4,
    Frieday = 5,
    Saturday = 6
}


@Entity()
export class ReservationLimitCount extends CoreEntity {
    @Column({ type: 'enum', enum: Week, default: Week.Sunday })
    @ApiProperty({
        description: '요일 [0-6] / 일요일 시작',
        example: Object.values(Week).join("|")
    })
    week: Week;

    @Column({ type: 'time' })
    @ApiProperty({
        type: 'string',
        description: '시간',
        example: '09:30'
    })
    time: string;

    @Column({ type: Number })
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: '예약 가능 고객 수',
        example: 10,
    })
    count: number;

    @ManyToOne(() => Category, (category) => category.limitCounts)
    @JoinColumn()
    category: Category;

    @RelationId((count: ReservationLimitCount) => count.category)
    categoryId: number;
}