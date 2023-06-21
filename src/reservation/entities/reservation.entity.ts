import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Chart } from 'src/charts/entities/chart.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

export enum ReservationStatus {
    Reserve = 'Reserve', // 예약
    Regist = 'Regist', // 접수
    Complete = 'Complete', // 완료
    Cancel = 'Cancel', // 취소
}

@Entity()
export class Reservation extends CoreEntity {
    @Column({type: Date})
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: '예약 일자',
        example: '2023-01-01 10:00:00',
    })
    reserveAt: Date;

    @Column({ type: 'enum', enum: ReservationStatus, default: ReservationStatus.Reserve })
    @ApiProperty({
        description: '예약 상태',
        example: Object.values(ReservationStatus).join("|")
    })
    status: ReservationStatus;

    @Column({type: 'text', nullable: true})
    @ApiProperty({
        description: '메모',
        example: "보톡스및 필러 관련 상담 원함.",
        nullable: true
    })
    memo?: String;

    @Column({type: 'json', nullable: true})
    @ApiProperty({
        description: '예약 상품 정보 리스트',
        example: "[{name: '보톡스 100유닛', price: 99000, procedures: [{name: '보톡스', count: 5}]}]",
        nullable: true
    })
    items?: String;

    @Column({ type: Boolean, default: false })
    isDelete: boolean;

    @ManyToOne(() => Chart, (chart) => chart.reservations)
    chart: Chart;

    @OneToMany(() => Payment, (payment) => payment.reservation)
    payments?: Payment[];
}