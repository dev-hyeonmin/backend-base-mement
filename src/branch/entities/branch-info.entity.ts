import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { Branch } from './branch.entity';

@Entity()
export class BranchInfo extends CoreEntity {
    @Column({ type: String, nullable: true })
    address: string;

    @Column({ type: String, nullable: true })
    callNumber?: string;

    @Column({ type: String, nullable: true })
    kakaoID?: string;

    @Column({ type: String, nullable: true })
    lineID?: string;

    @Column({ type: String, nullable: true })
    weChatID?: string;

    @OneToOne((type) => Branch, (branch) => branch.info)
    branch: Branch;
}