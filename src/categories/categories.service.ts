import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { GetCategoriesOutput } from './dtos/category.dto';
import { DataNotFoundException } from 'src/common/errors';
import { SubCategory } from './entities/subCategory.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categories: Repository<Category>,
        @InjectRepository(SubCategory)
        private readonly subCategories: Repository<SubCategory>,
    ) { }

    async getCategories(): Promise<GetCategoriesOutput> {
        try {
            const categoryList = await this.categories.find({
                relations: {
                    subCategories: true
                }
            });

            return { categories: categoryList };
        } catch (error) {
            throw error;
        }
    }

    async createCategory(name: string) {
        try {
            await this.categories.save(this.categories.create({ name }));
        } catch (error) {
            throw error;
        }
    }

    async editCategory({ id, name }) {
        try {
            const category = await this.categories.findOneBy({ id });
            if (!category) {
                throw new DataNotFoundException;
            }

            category.name = name;
            await this.categories.save(category);
        } catch (error) {
            throw error;
        }
    }

    async deleteCategory(id: number) {
        try {
            const category = await this.categories.findOneBy({ id });
            if (!category) {
                throw new DataNotFoundException;
            }

            await this.categories.delete({ id });
        } catch (error) {
            throw error;
        }
    }

    /*
     * Sub Category 
     */
    async createSubCategory(name: string, categoryId:number) {
        try {
            const category = await this.categories.findOneBy({ id: categoryId });
            if (!category) {
                throw new DataNotFoundException;
            }

            await this.subCategories.save(this.subCategories.create({ name, category: category.id }));
        } catch (error) {
            throw error;
        }
    }

    async editSubCategory(id: number, name: string) {
        try {
            const subCategory = await this.subCategories.findOneBy({ id });
            if (!subCategory) {
                throw new DataNotFoundException;
            }

            subCategory.name = name;
            await this.subCategories.save(subCategory);
        } catch (error) {
            throw error;
        }
    }

    async deleteSubCategory(id: number) {
        try {
            const subCategory = await this.subCategories.findOneBy({ id });
            if (!subCategory) {
                throw new DataNotFoundException;
            }

            await this.subCategories.delete({ id });
        } catch (error) {
            throw error;
        }
    }
}