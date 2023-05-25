import { Board } from 'src/boards/entities/board.entity';
import { CoreEntity } from 'src/common/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Comment extends CoreEntity {
    @Column("text")
    content: string;

    @Column({ type: Number, default: 0 })
    depth: number;

    @ManyToOne(() => User, (user) => user.comments)
    user: User;

    @ManyToOne(() => Comment, (comment) => comment.replies)
    reference: Comment;

    @ManyToOne(() => Board, (board) => board.comments)
    board: Board;

    @OneToMany(() => Comment, (comment) => comment.reference)
    replies: Comment[];
}
