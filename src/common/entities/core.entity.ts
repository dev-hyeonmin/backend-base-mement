import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export class CoreEntity {
    @PrimaryGeneratedColumn()
    @Column((type) => Number)
    @ApiProperty({
        description: '고유 ID',
        example: 1,
    })
    id: number;

    @CreateDateColumn()
    @Column((type) => Date)
    @ApiProperty({
        type: String,
        description: '생성 일자',
        example: '2023-01-01 10:00:00',
    })
    createAt: Date;

    @UpdateDateColumn()
    @Column((type) => Date)
    @ApiProperty({
        type: String,
        description: '업데이트 일자',
        example: '2023-01-01 10:00:00',
    }) 
    updateAt: Date;
}
