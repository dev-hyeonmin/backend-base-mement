import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { EventGroup } from './EventGroup.entity';
import { isMultilingual } from 'src/common/entities/multilin.decorator';
import { Branch } from 'src/branch/entities/branch.entity';

export enum EventDegreeType {
    Degree1 = 1,
    Degree2 = 2,
    Appointed = 3
}

@Entity()
export class EventDegree extends CoreEntity {
    @Column({ type: 'enum', enum: EventDegreeType, default: EventDegreeType.Degree1 })
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: '이벤트 차수',
        example: 1,
    })
    degree: EventDegreeType;

    @isMultilingual(String)
    @Column({type: String})
    @ApiProperty({
        type: String,
        description: '이벤트 차수 타이틀',
        example: '뮤즈클리닉 9월 1차 이벤트',
    }) 
    title: string;

    @isMultilingual(String)
    @Column({type: String, nullable: true})
    @ApiProperty({
        type: String,
        description: '이벤트 차수 설명',
        example: '원내 사정에 따라 이벤트 상품이 변경되거나<br>조기 종료될 수 있습니다.',
    }) 
    description?: string;

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
 
    @ManyToOne(() => Branch, (branch) => branch.degrees)
    branchId: number;
}