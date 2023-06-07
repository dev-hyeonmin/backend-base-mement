import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { enumToArray } from '../util/enumToArray';

export class ErrorCommonResponse<T> {
  @ApiProperty({ enum: enumToArray(HttpStatus), description: '상태코드' })
  statusCode: number;

  @ApiProperty({ type: String, description: '에러 발생시간' })
  readonly timestamp: Date;

  @ApiProperty({ type: String, description: '에러 발생 url' })
  path: string;

  @ApiProperty({
    type: 'generic',
    description:
      'Error message'
  })
  error: T;
}