import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { enumToArray } from "../util/enumToArray";

export enum HttpErrorNameEnum {
    NotFound = '404'
}

export class HttpExceptionErrorResponseDto {
    @ApiProperty({
        enum: HttpErrorNameEnum,
        description: '에러명'
    })
    error: string;

    @ApiProperty({
        type: String,
        description: '에러메시지'
    })
    message: string;

    @ApiProperty({
        enum: enumToArray(HttpStatus),
    })
    statusCode: number;

    @ApiProperty({
        type: String,
        nullable: true
    })
    code?: string;

    constructor(
        statusCode: number,
        error: string,
        message: string,
        code?: string
    ) {
        this.error = error;
        this.statusCode = statusCode;
        this.code = code;
        this.message = message;
    }
}