import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Chart } from './chart.entity';

export enum MarketingAgreeState {
    Agree = 'Y',
    DisAgree = 'N'
}

@Entity()
export class MarketingAgree extends CoreEntity {
    @Column({ type: 'enum', enum: MarketingAgreeState, default: MarketingAgreeState.DisAgree })
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: '마켓팅 활용동의',
        example: 'Y',
    })
    status: MarketingAgreeState;

    @ManyToOne(() => Chart, (chart) => chart.marketingAgree)
    chart: Chart;
}