import { PickType } from "@nestjs/swagger";
import { Board } from "../entities/board.entity";

export class GetBoardsOutput {
    notices?: Board[];
    boards: Board[];
}

export class GetBoardOutput {
    board: Board;
}

export class CreateBoardInput extends PickType(Board, ['title', 'content']) {
    subCategoryId: number;
}

export class EditBoardInput extends PickType(Board, ['id', 'title', 'content', 'notice']) {
    subCategoryId: number;
}

export class DeleteBoardInput extends PickType(Board, ['id']) { }