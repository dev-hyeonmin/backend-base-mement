import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SuccessCommonResponseDto<T> {
    //enum: EnumToArray(HttpStatus), 
    @ApiProperty({ description: '상태코드' })
    @Expose()
    readonly statusCode: number;

    @ApiProperty({ type: Boolean, description: '성공여부' })
    @Expose()
    readonly success: boolean;

    @ApiProperty({
        type: 'generic',
        description: 'object 또는 array 형식의 데이터'
    })
    @Expose()
    result: T;
}