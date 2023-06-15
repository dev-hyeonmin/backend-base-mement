import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/swagger/SuccessResponse.decorator';
import { CreateHolidayInput, GetHolidaysOuput, GetTimetablesInput, GetTimetablesOuput } from './dtos/Timetable.dto';


@ApiTags('timetable')
@Controller('timetable')
export class TimetableController {
    constructor() { }

    @Get()
    @ApiOperation({ summary: '예약 가능 시간 조회' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: GetTimetablesOuput,
            exampleTitle: 'Success',
            exampleDescription: ''
        }
    ])
    async getTimetables(@Query() getReservationsInput: GetTimetablesInput): Promise<void> {
        //
    }

    @Get('counts')
    @ApiOperation({ summary: '예약 가능 인원 요일&시간별 설정 리스트' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: GetTimetablesOuput,
            exampleTitle: 'Success',
            exampleDescription: ''
        }
    ])
    async getTimetablesCounts(): Promise<void> {
        //
    }

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
