import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/Category.entity";
import { Repository } from "typeorm";
import { getCategoriesOutput } from "./dtos/category.dto";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categories: Repository<Category>,
    ) { }

    async getCategories(): Promise<getCategoriesOutput> {
        try {
            const categories = await this.categories.find({
                where: {
                    isDelete: false
                }
            });

            return { categories };
        } catch (error) {
            throw error;
        }
    }
}
