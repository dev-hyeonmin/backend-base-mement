import { PickType } from "@nestjs/swagger";
import { Board } from "../entities/board.entity";

export class GetBoardsOutput {
    boards: Board[];
}

export class CreateBoardInput extends PickType(Board, ['title', 'context']) {
    subCategoryId: number;
}

export class EditBoardInput extends PickType(Board, ['id', 'title', 'context']) {
    subCategoryId: number;
}

export class DeleteBoardInput extends PickType(Board, ['id']) { }