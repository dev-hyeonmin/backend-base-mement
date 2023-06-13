import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MarketingAgree } from './marketingAgree.entity';
import { DeleteFlag } from 'src/common/entities/status';

export enum ChartGender {
    Man = 'M',
    Woman = 'W'
}

@Entity()
export class Chart extends CoreEntity {
    @Column({ type: String })
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: '차트명',
        example: 'SB0134039',
    })
    code: string;

    @Column({ type: String })
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: '고객명',
        example: '홍길동',
    })
    name: string;

    @Column({ type: Number })
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: '휴대전화 번호',
        example: '01012341234',
    })
    phone: number;

    @Column({ type: 'enum', enum: ChartGender, default: ChartGender.Woman })
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: '성별',
        example: 'W',
    })
    gender: ChartGender;

    @Column({ type: Number })
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: '나이',
        example: '27',
    })
    age: number;

    @Column({ type: 'text', nullable: true })
    @ApiProperty({
        description: '특이사항 메모',
        example: "해당 고객님은 주사바늘을 몹시 두려워함.",
        nullable: true
    })
    memo?: String;

    @Column({ type: 'enum', enum: DeleteFlag, default: DeleteFlag.Active })
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: '삭제 여부',
        example: 'N',
    })
    isDelete: DeleteFlag;

    @OneToMany(() => Reservation, (reservation) => reservation.chart)
    reservations?: Reservation[];

    @OneToMany(() => MarketingAgree, (marketing) => marketing.chart)
    marketingAgree?: MarketingAgree;

    @BeforeInsert()
    async createChartCode(): Promise<void> {
        try {
            // this.code = this.code;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }
}