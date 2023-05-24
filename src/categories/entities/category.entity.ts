import { CoreEntity } from "src/common/core.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { SubCategory } from "./subCategory.entity";

@Entity()
export class Category extends CoreEntity {
    @Column({ type: String })
    name: string;

    @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
    subCategories: SubCategory[];
}