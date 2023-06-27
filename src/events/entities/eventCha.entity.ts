import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { EventGroup } from './EventGroup.entity';

export enum EventChaType {
    Cha1 = 1,
    Cha2 = 2,
    Appointed = 3
}

@Entity()
export class EventCha extends CoreEntity {
    @Column({ type: 'enum', enum: EventChaType, default: EventChaType.Cha1 })
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: '이벤트 차수',
        example: 1,
    })
    type: EventChaType;

    @Column({type: Date})
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: '이벤트 시작 일자',
        example: '2023-01-01 10:00:00',
    }) 
    startAt: Date;

    @Column({type: Date})
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: '이벤트 종료 일자',
        example: '2023-01-31 10:00:00',
    }) 
    endAt: Date;
 
    // @OneToMany(() => EventGroup, (group) => group.cha)
    // groups: EventGroup[];
}