import { PickType } from "@nestjs/swagger";
import { Category } from "../entities/category.entity";

export class GetCategoriesOutput {
    categories: Category[];
}

export class CreateCategoryInput extends PickType(Category, ['name']) { }

export class EditCategoryInput extends PickType(Category, ['id', 'name']) { }

export class DeleteCategoryInput extends PickType(Category, ['id']) { }