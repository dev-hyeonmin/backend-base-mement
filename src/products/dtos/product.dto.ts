import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Product } from "../entities/product.entity";
import { ProductProcedures } from "../entities/product_procedures.entity";

export class GetProductsInput extends PickType(PartialType(Product), ['name']) {}

export class getProductsOutput {
    @ApiProperty({
        type: [Product],
        description: "상품 리스트"
    })
    products: Product[];
};

export class getProductOutput {
    @ApiProperty({
        type: Product,
        description: "상품 정보"
    })
    products: Product;
};

export class CreateProductInput extends PickType(PartialType(Product), ['name', 'description', 'price']) {
    @ApiProperty({ 
        type: [ProductProcedures],
        description: '시술 ID 배열',
        example: [
            {
                procedureId: 1,
                count: 3
            },
        ],
    })
    procedures: ProductProcedures[];
}

export class UpdateProductInput extends PickType(PartialType(Product), ['name', 'description', 'price']) {
    @ApiProperty({
        type: Array,
        description: '시술 ID 배열',
        example: [1, 9, 10],
    })
    procedures: number[];
}