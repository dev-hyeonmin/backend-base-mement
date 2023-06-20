import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/swagger/SuccessResponse.decorator';
import { CreateHolidayInput, GetHolidaysOuput } from './dtos/Timetable.dto';


@ApiTags('timetable')
@Controller('timetable')
export class TimetableController {
    constructor() { }

    /*
     * Holiday
    */
    @Get('holiday')
    @ApiOperation({ summary: '휴무일 조회' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: GetHolidaysOuput,
            exampleTitle: 'Success',
            exampleDescription: ''
        }
    ])
    async getHolidays(): Promise<void> {
        //
    }

    @Post('holiday')
    @ApiOperation({ summary: '휴무일 저장' })
    @ApiOkResponse()
    async createHoliday(@Body() createHolidayInput: CreateHolidayInput): Promise<void> {
        //
    }
}
