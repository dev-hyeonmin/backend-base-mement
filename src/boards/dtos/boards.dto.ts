import { PickType } from "@nestjs/swagger";
import { Board } from "../entities/board.entity";

export class GetBoardsOutput {
    boards: Board[];
}

export class CreateBoardInput extends PickType(Board, ['title', 'content']) {
    subCategoryId: number;
}

export class EditBoardInput extends PickType(Board, ['id', 'title', 'content']) {
    subCategoryId: number;
}

export class DeleteBoardInput extends PickType(Board, ['id']) { }