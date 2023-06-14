import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/swagger/SuccessResponse.decorator';
import { CreateProcedureInput, GetProceduresInput, UpdateProcedureInput, getProcedureOutput, getProceduresOutput } from './dtos/procedure.dto';

@ApiTags('procedures')
@Controller('procedures')
export class ProceduresController {
    constructor() { }

    @Get()
    @ApiOperation({ summary: '시술 리스트 조회' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: getProceduresOutput,
            exampleTitle: 'Success',
            exampleDescription: ''
        }
    ])
    async getProcedures(@Query() getProceduresInput: GetProceduresInput): Promise<void> {
        //
    }

    @Get(":id")
    @ApiOperation({ summary: '시술 상세 조회' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: getProcedureOutput,
            exampleTitle: 'Success',
            exampleDescription: ''
        }
    ])
    async getProcedure(@Param('id') ProcedureId: number): Promise<void> {
        // 
    }

    @Post()
    @ApiOperation({ summary: '시술 생성' })
    @ApiOkResponse()
    async createProcedure(@Body() createProcedureInput: CreateProcedureInput): Promise<void> {
        //
    }

    @Put(":id")
    @ApiOperation({ summary: '시술 업데이트' })
    @ApiOkResponse()
    async updateProcedure(
        @Param('id') ProcedureId: number,
        @Body() updateProcedureInput: UpdateProcedureInput
    ): Promise<void> {
        //
    }

    @Delete(":id")
    @ApiOperation({ summary: '시술 삭제', description: 'isDelete 컬럼으로 삭제 여부 판별' })
    @ApiOkResponse()
    async deleteProcedure(@Param('id') chartId: number): Promise<void> {
        //
    }
}
