import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation, ReservationStatus } from './entities/reservation.entity';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/swagger/SuccessResponse.decorator';
import { getReservationSchema, getReservationsSchema } from './dtos/schema.dto';
import { CreateReservationsInput, GetReservationsInput, UpdateReservationsInput } from './dtos/reservation.dto';
import { CoreOutput } from 'src/common/dtos/output.dto';

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
}
