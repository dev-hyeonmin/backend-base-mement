import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';

@Entity()
export class Holiday extends CoreEntity {
    @Column({ type: 'time' })
    @ApiProperty({
        type: 'string',
        description: '시간',
        example: '09:30'
    })
    time: string;
}