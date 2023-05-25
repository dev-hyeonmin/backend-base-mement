import { PickType } from "@nestjs/swagger";
import { Comment } from "../entities/comment.entity";

export class GetCommentsOutput {
    comments: Comment[];
}

export class CreateCommentInput extends PickType(Comment, ['content']) {
    boardId: number;
    referenceId?: number;
}

export class EditCommentInput extends PickType(Comment, ['content']) { }