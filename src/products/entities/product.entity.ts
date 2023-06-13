import { IsNotEmpty } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

/*
 * 상품명, 상품설명, 이벤트 상품 여부, 삭제 플래그
 */
@Entity()
export class Product extends CoreEntity {
    @IsNotEmpty()
    @Column({ type: String })
    name: string;

    @Column({ type: String, nullable: true })
    description?: string;

    @Column({ type: Boolean, default: false })
    isEvent: boolean;

    @Column({ type: Boolean, default: false })
    isDelete: boolean;
}