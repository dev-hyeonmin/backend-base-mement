import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/categories/entities/Category.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Procedure } from 'src/procedures/entities/Procedure.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ProductProcedures } from './product_procedures.entity';

/*
 * 상품명, 상품설명, 이벤트 상품 여부, 삭제 플래그
 */
@Entity()
export class Product extends CoreEntity {
    @IsNotEmpty()
    @Column({ type: String })
    @ApiProperty({
        type: String,
        description: '상품명',
        example: '국산 침샘보톡스 100U',
    })
    name: string;

    @Column({ type: String, nullable: true })
    @ApiProperty({
        type: String,
        description: '상품 설명',
        example: '[귀밑샘] 부위만 시술 가능합니다.<br>*턱밑샘, 또는 혀밑샘 부위 시술 불가',
    })
    description?: string;

    @Column({ type: Number, default: 0 })
    @ApiProperty({
        type: Number,
        description: '가격',
        example: 99000,
    })
    price: number;

    // @Column({ type: Number, default: 1 })
    // @ApiProperty({
    //     type: Number,
    //     description: '시술 가능 횟수',
    //     example: 5,
    // })
    // count: number;

    // @Column({ type: Boolean, default: false })
    // @ApiProperty({
    //     type: String,
    //     description: '이벤트 상품 여부',
    //     example: false,
    // })
    // isEvent: boolean;

    @Column({ type: Boolean, default: false })
    isDelete: boolean;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinTable({ name: 'product_procedures' })
    @ApiProperty({
        type: Category,
        description: '카테고리',
        example: {},
    })
    category: Category;

    @ManyToMany(type => Procedure, { eager: true })
    // @JoinTable({ name: 'product_procedures' })
    @ApiProperty({
        type: [Procedure],
        description: '시술 배열',
        example: [],
    })
    procedures: Procedure[]

    @ManyToOne(() => ProductProcedures, pro => pro.products)
    productProcedures: ProductProcedures[]    
}