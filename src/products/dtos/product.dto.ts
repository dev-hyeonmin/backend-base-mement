import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Product } from "../entities/product.entity";

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

export class CreateProductInput extends PickType(PartialType(Product), ['name', 'description', 'price', 'count']) { }

export class UpdateProductInput extends PickType(PartialType(Product),['name', 'description', 'price', 'count']) { }