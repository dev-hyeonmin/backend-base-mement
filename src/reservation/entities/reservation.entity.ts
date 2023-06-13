import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

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

    @ManyToOne(() => User, (user) => user.reservations)
    user?: User;
}