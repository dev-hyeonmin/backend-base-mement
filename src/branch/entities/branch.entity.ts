import { IsNotEmpty } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { EventDegree } from 'src/events/entities/eventDegree.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Branch extends CoreEntity {
    @Column({type: String})
    @IsNotEmpty()
    name: string;

    @Column({type: String})
    @IsNotEmpty()
    name_eng: string;

    @OneToMany(() => EventDegree, (degree) => degree.branchId)
    degrees?: EventDegree[];
}