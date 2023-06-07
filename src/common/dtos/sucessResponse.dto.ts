import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class SuccessCommonResponseDto<T> {
    //enum: EnumToArray(HttpStatus), 
    @ApiProperty({ example: HttpStatus.OK, description: '상태코드' })
    statusCode: number;

    @ApiProperty({ type: Boolean, example: true, description: '성공여부' })
    readonly success: boolean;

    @ApiProperty({
        type: 'generic',
        description: 'object 또는 array 형식의 데이터'
    })
    result: T;
}