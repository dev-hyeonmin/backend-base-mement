import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class SuccessCommonResponseDto<T> {
    //enum: EnumToArray(HttpStatus), 
    @ApiProperty({ description: '상태코드' })
    readonly statusCode: number;

    @ApiProperty({ type: Boolean, description: '성공여부' })
    readonly success: boolean;

    @ApiProperty({
        type: 'generic',
        description: 'object 또는 array 형식의 데이터'
    })
    result: T;
}