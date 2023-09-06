import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Category } from "../entities/Category.entity";

export class GetCategoryInput extends PickType(PartialType(Category), ['name']) { }

export class getCategoriesOutput {
    @ApiProperty({
        type: [Category],
        description: "상품 리스트"
    })
    categories: Category[];
};

export class getCategoryOutput {
    @ApiProperty({
        type: Category,
        description: "상품 정보"
    })
    categories: Category;
};

export class CreateCategoryInput extends PickType(PartialType(Category), ['name']) { }

export class UpdateCategoryInput extends PickType(PartialType(Category), ['name']) { }