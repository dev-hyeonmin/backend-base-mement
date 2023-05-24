import { PickType } from "@nestjs/swagger";
import { SubCategory } from "../entities/subCategory.entity";

export class CreateSubCategoryInput extends PickType(SubCategory, ['name']) { }

export class EditSubCategoryInput extends PickType(SubCategory, ['id', 'name']) {
    categoryId: number;
}