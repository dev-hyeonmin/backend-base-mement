import { ApiProperty } from "@nestjs/swagger";

export class GetListOutput<T> {
    list: T[];

    @ApiProperty({
        description: '전체 데이터 수'
    })
    total: number;

    @ApiProperty({
        description: '현재 페이지'
    })
    currentPage: number;

    @ApiProperty({
        description: '마지막 페이지'
    })
    lastPage: number;
}