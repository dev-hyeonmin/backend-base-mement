import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Procedure extends CoreEntity {
    @IsNotEmpty()
    @Column({ type: String })
    @ApiProperty({
        type: String,
        description: '시술명',
        example: '보톡스(이노톡스)',
    })
    name: string; 

    @Column({ type: Boolean, default: false })
    isDelete: boolean;
}