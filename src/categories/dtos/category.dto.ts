import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Category } from "../entities/Category.entity";

export class GetCategoriesInput extends PickType(PartialType(Category), ['name']) { }

export class getCategoriesOutput {
    @ApiProperty({
        type: [Category],
        description: "상품 리스트"
    })
    Categorys: Category[];
};

export class getCategoryOutput {
    @ApiProperty({
        type: Category,
        description: "상품 정보"
    })
    Category: Category;
};

export class CreateCategoryInput extends PickType(PartialType(Category), ['name']) { }

export class UpdateCategoryInput extends PickType(PartialType(Category), ['name']) { }