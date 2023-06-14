import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/swagger/SuccessResponse.decorator';
import { CreateProductInput, GetProductsInput, UpdateProductInput, getProductOutput, getProductsOutput } from './dtos/product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor() { }

    @Get()
    @ApiOperation({ summary: '상품 리스트 조회' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: getProductsOutput,
            exampleTitle: 'Success',
            exampleDescription: ''
        }
    ])
    async getRpducts(@Query() getProductsInput: GetProductsInput): Promise<void> {
        //
    }

    @Get(":id")
    @ApiOperation({ summary: '상품 상세 조회' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: getProductOutput,
            exampleTitle: 'Success',
            exampleDescription: ''
        }
    ])
    async getProduct(@Param('id') productId: number): Promise<void> {
        // 
    }

    @Post()
    @ApiOperation({ summary: '상품 생성' })
    @ApiOkResponse()
    async createProduct(@Body() createProductInput: CreateProductInput): Promise<void> {
        //
    }

    @Put(":id")
    @ApiOperation({ summary: '차트 업데이트' })
    @ApiOkResponse()
    async updateProduct(
        @Param('id') productId: number,
        @Body() updateProductInput: UpdateProductInput
    ): Promise<void> {
        //
    }

    @Delete(":id")
    @ApiOperation({ summary: '상품 삭제', description: 'isDelete 컬럼으로 삭제 여부 판별' })
    @ApiOkResponse()
    async deleteProduct(@Param('id') chartId: number): Promise<void> {
        //
    }
}
