import { CoreEntity } from 'src/common/core.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    RelationId,
} from 'typeorm';
import { SubCategory } from 'src/categories/entities/subCategory.entity';
import { User } from 'src/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
export class Board extends CoreEntity {
    @ApiProperty({
        example: 'Node.js의 동작 원리가 궁금합니다.',
        description: '게시글 제목',
        required: true,
    })
    @Column({ type: String })
    title: string;

    @ApiProperty({
        example: 'Node.js API는 Javascript로 되어있고 나머지 부분은 C, C++로 되어있다. 우리가 만든 `Node.js` 코드를 실행하면 Node.js API → Binding → V8 → libuv 등 순으로 흘러갈 것이다.',
        description: '게시글 내용',
        required: true,
    })
    @Column("text")
    content: string;

    @Column({type: Number, default: 0})
    notice: number;

    @ManyToOne(() => SubCategory, (subCategory) => subCategory.boards)
    @JoinColumn()
    subCategory: number;

    @ManyToOne(() => User, (user) => user.boards)
    @JoinColumn()
    user: User;

    @RelationId((board: Board) => board.user)
    userId: number;

    @OneToMany(() => Comment, (comment) => comment.board)
    comments: Comment[];
}
