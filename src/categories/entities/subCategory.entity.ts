import { CoreEntity } from "src/common/core.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class SubCategory extends CoreEntity {
    @ManyToOne(() => Category, (category) => category.subCategories)
    category: number;

    @Column({ type: String })
    name: string;
}