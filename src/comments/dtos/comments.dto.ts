import { PickType } from "@nestjs/swagger";
import { Comment } from "../entities/comment.entity";

export class GetCommentsOutput {
    comments: Comment[];
}

export class CreateCommentInput extends PickType(Comment, ['content', 'boardId', 'referenceId']) {}

export class EditCommentInput extends PickType(Comment, ['content']) { }