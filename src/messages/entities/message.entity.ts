import { Board } from 'src/boards/entities/board.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, RelationId } from 'typeorm';

@Entity()
export class Message extends CoreEntity {
    @Column("text")
    content: string;

    @ManyToOne(() => User, (user) => user.messages)
    user: User;

    @RelationId((message: Message) => message.user)
    userId: number;

    @ManyToOne(() => Board, (board) => board.messages)
    board: Board;

    @RelationId((message: Message) => message.board)
    boardId: number;
}
