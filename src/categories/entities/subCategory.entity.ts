import { CoreEntity } from "src/common/core.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./category.entity";
import { Board } from "src/boards/entities/board.entity";

@Entity()
export class SubCategory extends CoreEntity {
    @ManyToOne(() => Category, (category) => category.subCategories)
    category: number;

    @Column({ type: String })
    name: string;

    @OneToMany(() => Board, (board) => board.subCategory)
    boards: Board[];
}