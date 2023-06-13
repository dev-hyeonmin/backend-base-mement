import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/swagger/SuccessResponse.decorator';
import { CreateChartInput, GetChartsInput, UpdateChartInput, getChartOutput, getChartsOutput } from './dtos/chart.dto';
import { CreateMarketingAgreeInput } from './dtos/marketingAgree.dto';
import { MarketingAgreeState } from './entities/marketingAgree.entity';

@ApiTags('charts')
@Controller('charts')
export class ChartsController {
    constructor() { }

    @Get()
    @ApiOperation({ summary: '차트 검색' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: getChartsOutput,
            exampleTitle: 'Success',
            exampleDescription: ''
        }
    ])
    async getCharts(@Query() getChartsInput: GetChartsInput): Promise<void> {
        // return this.reservationsService.getResrvations();
    }

    @Get(":id")
    @ApiOperation({ summary: '차트 상세 조회' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: getChartOutput,
            exampleTitle: 'Success',
            exampleDescription: ''
        }
    ])
    async getResrvation(@Param('id') chartId: number): Promise<void> {
        // return this.reservationsService.getResrvation();
    }

    @Post()
    @ApiOperation({ summary: '차트 생성' })
    @ApiOkResponse()
    async createChart(@Body() createChartInput: CreateChartInput): Promise<void> {
        //
    }

    @Put(":id")
    @ApiOperation({ summary: '차트 업데이트' })
    @ApiOkResponse()
    async updateResrvation(
        @Param('id') reserveId: number,
        @Body() updateChartInput: UpdateChartInput
    ): Promise<void> {
        //
    }

    @Delete(":id")
    @ApiOperation({ summary: '차트 삭제', description: 'isDelete 컬럼으로 삭제 여부 판별' })
    @ApiOkResponse()
    async deleteResrvation(@Param('id') chartId: number): Promise<void> {
        //
    }

    /**
     * Marketing
     */
    @Post(':id/marketings')
    @ApiOperation({ summary: '마켓팅 활용 동의 로그 추가' })
    @ApiOkResponse()
    async createMarketingAgree(
        @Param('id') chartId: number,
        @Body() { status }: CreateMarketingAgreeInput
    ): Promise<void> {
        //
    }
}
