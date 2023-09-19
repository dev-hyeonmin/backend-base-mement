import { IsNotEmpty } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { EventDegree } from 'src/events/entities/eventDegree.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BranchInfo } from './branch-info.entity';

@Entity()
export class Branch extends CoreEntity {
    @Column({type: String})
    @IsNotEmpty()
    name: string;

    @Column({type: String})
    @IsNotEmpty()
    nameEng: string;

    // @Column({type: String})
    // @IsNotEmpty()
    // address: string;

    // @Column({type: String})
    // @IsNotEmpty()
    // callNumber: string;

    // @Column({type: String})
    // @IsNotEmpty()
    // kakaoID: string;

    // @Column({type: String})
    // @IsNotEmpty()
    // lineID: string;

    // @Column({type: String})
    // @IsNotEmpty()
    // weChatID: string;

    @OneToMany(() => EventDegree, (degree) => degree.branchId)
    degrees?: EventDegree[];

    @OneToOne(() => BranchInfo)
    @JoinColumn()
    info?: BranchInfo
}