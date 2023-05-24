import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCategoryInput, DeleteCategoryInput, EditCategoryInput, GetCategoriesOutput } from './dtos/category.dto';
import { CategoriesService } from './categories.service';
import { Roles } from 'src/auth/roles.decorator';
import { CreateSubCategoryInput, EditSubCategoryInput } from './dtos/subCategory.dto';

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService
    ) { }

    @Get()
    async getCategory(): Promise<GetCategoriesOutput> {
        return this.categoriesService.getCategories();
    }

    @Post()
    @Roles(['Admin'])
    async createCategory(@Body() { name }: CreateCategoryInput) {
        return this.categoriesService.createCategory(name);
    }

    @Put()
    @Roles(['Admin'])
    async editCategory(@Body() editCategoryInput: EditCategoryInput) {
        return this.categoriesService.editCategory(editCategoryInput);
    }

    @Delete()
    @Roles(['Admin'])
    async deleteCategory(@Body() { id }: DeleteCategoryInput) {
        return this.categoriesService.deleteCategory(id);
    }

    /**
     * Sub Category
     */
    @Post(':categoryId/sub-categories')
    @Roles(['Admin'])
    async createSubCategory(@Param('categoryId') categoryId: number, @Body() { name }: CreateSubCategoryInput) {
        return this.categoriesService.createSubCategory(name, categoryId);
    }

    @Put(':categoryId/sub-categories/:id')
    @Roles(['Admin'])
    async editSubCategory(@Param('id') id: number, @Body() { name }: EditSubCategoryInput) {
        return this.categoriesService.editSubCategory(id, name);
    }

    @Delete(':categoryId/sub-categories/:id')
    @Roles(['Admin'])
    async deleteSubCategory(@Param('id') id: number) {
        return this.categoriesService.deleteSubCategory(id);
    }
}
