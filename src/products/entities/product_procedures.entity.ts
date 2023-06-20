import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/categories/entities/Category.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Procedure } from 'src/procedures/entities/Procedure.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, RelationId } from 'typeorm';
import { Product } from './product.entity';

/*
 * 상품명, 상품설명, 이벤트 상품 여부, 삭제 플래그
 */
@Entity()
export class ProductProcedures extends CoreEntity {
    @IsNotEmpty()
    @Column({ type: Number })
    @ApiProperty({
        type: Number,
        description: '시술 횟수',
        example: 3,
    })
    count: number;

    @ManyToOne(() => Product, product => product.productProcedures)
    products: Product[];

    @ManyToOne(() => Procedure, procedure => procedure.productProcedures)
    procedures: Procedure[];

    @RelationId((pro: ProductProcedures) => pro.procedures)
    @ApiProperty({
        type: Number,
        description: '시술 ID',
        example: 1,
    })
    proceduresId: number;
}