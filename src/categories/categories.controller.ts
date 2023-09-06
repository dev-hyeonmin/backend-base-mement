import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/swagger/SuccessResponse.decorator';
import { CreateCategoryInput, UpdateCategoryInput, getCategoryOutput, getCategoriesOutput } from './dtos/category.dto';
import { CategoriesService } from './categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) { }

    @Get()
    @ApiOperation({ summary: '카테고리 리스트 조회' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: getCategoriesOutput,
            exampleTitle: 'Success',
            exampleDescription: ''
        }
    ])
    async getCategories(): Promise<getCategoriesOutput> {
        return await this.categoryService.getCategories();
    }

    @Get(":id")
    @ApiOperation({ summary: '카테고리 상세 조회' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: getCategoryOutput,
            exampleTitle: 'Success',
            exampleDescription: ''
        }
    ])
    async getCategory(@Param('id') CategoryId: number): Promise<void> {
        // 
    }

    @Post()
    @ApiOperation({ summary: '카테고리 생성' })
    @ApiOkResponse()
    async createCategory(@Body() createCategoryInput: CreateCategoryInput): Promise<void> {
        //
    }

    @Put(":id")
    @ApiOperation({ summary: '카테고리 업데이트' })
    @ApiOkResponse()
    async updateCategory(
        @Param('id') CategoryId: number,    
        @Body() updateCategoryInput: UpdateCategoryInput
    ): Promise<void> {
        //
    }

    @Delete(":id")
    @ApiOperation({ summary: '카테고리 삭제', description: 'isDelete 컬럼으로 삭제 여부 판별' })
    @ApiOkResponse()
    async deleteCategory(@Param('id') chartId: number): Promise<void> {
        //
    }
}
