import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/swagger/SuccessResponse.decorator';
import { getReservationSchema, getReservationsSchema } from './dtos/schema.dto';
import { CreateReservationsInput, GetReservationsInput, UpdateReservationsInput } from './dtos/reservation.dto';
import { GetAvailableTimesInput, GetAvailableTimesOuput, GetReservationLimitCountsOuput, UpdateReservationLimitCountsInput } from './dtos/reservationLimitCount.dto';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('reservation')
@Controller('reservation')
export class ReservationController {
    constructor(
        private readonly reservationsService: ReservationService
    ) { }

    @Get()
    @ApiOperation({ summary: '예약 리스트 조회' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: getReservationsSchema,
            exampleTitle: 'Success',
            exampleDescription: ''
        }
    ])
    async getResrvations(@Query() getReservationsInput: GetReservationsInput): Promise<void> {
        // return this.reservationsService.getResrvations();
    }

    @Get(":id")
    @ApiOperation({ summary: '예약 상세 조회' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: getReservationSchema,
            exampleTitle: 'Success',
            exampleDescription: ''
        }
    ])
    async getResrvation(@Param('id') reserveId: number): Promise<void> {
        // return this.reservationsService.getResrvation();
    }

    @Post()
    @ApiOperation({ summary: '예약 생성' })
    @ApiOkResponse()
    async createResrvation(@Body() createReservationsInput: CreateReservationsInput): Promise<void> {
        //
    }

    @Put(":id")
    @ApiOperation({ summary: '예약 업데이트' })
    @ApiOkResponse()
    async updateResrvation(
        @Param('id') reserveId: number,
        @Body() updateReservationsInput: UpdateReservationsInput
    ): Promise<void> {
        //
    }

    @Delete(":id")
    @ApiOperation({ summary: '예약 삭제' })
    @ApiOkResponse()
    async deleteResrvation(@Param('id') reserveId: number): Promise<void> {
        //
    }

    /**
     * Reservation Limit Count
     */
    @Get('limitcounts')
    @Roles(['Admin'])
    @ApiOperation({ summary: '예약 가능 시간 조회' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: GetReservationLimitCountsOuput,
            exampleTitle: 'Success',
            exampleDescription: '예약 가능 인원 요일&시간별 설정 리스트'
        }
    ])
    async getReservationLimitCounts(): Promise<void> {
        //
    }

    @Post('limitcounts')
    @Roles(['Admin'])
    @ApiOperation({ summary: '예약 가능 인원 저장' })
    @ApiOkResponse()
    async updateReservationLimitCounts(@Body() createProductInput: UpdateReservationLimitCountsInput): Promise<void> {
        //
    }

    @Get('availabletimes')
    @ApiOperation({ summary: '예약 가능 시간 조회' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: GetAvailableTimesOuput,
            exampleTitle: 'Success',
            exampleDescription: '예약 가능한 시간 조회'
        }
    ])
    async getAvailableTimes(@Query() getAvailableTimesInput: GetAvailableTimesInput): Promise<void> {
        //
    }
}
