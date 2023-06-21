import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/swagger/SuccessResponse.decorator';
import { CreatePaymentInput, GetPaymentOutput, GetPaymentsInput, GetPaymentsOutput } from './dtos/payment.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
    @Get()
    @ApiOperation({ summary: '결제 내역 조회' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: GetPaymentsOutput,
            exampleTitle: 'Success',
            exampleDescription: ''
        }
    ])
    async getPayments(@Query() getPaymentsInput: GetPaymentsInput): Promise<void> {
        //
    }

    @Post()
    @ApiOkResponse()
    async createPayment(@Body() createPaymentInput: CreatePaymentInput): Promise<void> {
        //
    }
}
