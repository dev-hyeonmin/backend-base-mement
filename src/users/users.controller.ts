import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import {
    CreateAccountInput,
    CreateAccountOutput,
    LoginInput,
    LoginOutput,
    UserProfileOutput,
} from './dtos/users.dto';
import { UpdateAccountInput } from './dtos/users.dto';
import { UpdateAccountOutput } from './dtos/users.dto';
import { VerifyEmailOutput } from './dtos/verify-email.dto';
import { SuccessResponse } from 'src/common/swagger/SuccessResponse.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/swagger/errorResponse.decorator';
import { UserNotFoundException } from 'src/common/errors';
import { USER_NOT_FOUND } from 'src/common/errors.constants';

/*
 * GET    : getting data
 * POST   : creating data
 * PUT    : updating data
 * DELETE : deleting data
 */

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get('verification')
    async verifyEmail(@Req() data: any): Promise<VerifyEmailOutput> {
        return this.userService.verifyEmail(data.query.code);
    }

    @Get(':id')
    async userFindById(@Param('id') id: number): Promise<UserProfileOutput> {
        const result = await this.userService.userFindById(id);
        return result;
    }

    @Post('login')
    @SuccessResponse(HttpStatus.OK, [
        {
            model: LoginOutput,
            exampleTitle: 'Success login',
            exampleDescription: 'Success login description'
        }
    ])
    @ErrorResponse(USER_NOT_FOUND, [
        {
            model: UserNotFoundException,
            exampleTitle: "인증오류 - 유저없음",
            message: "User Not Found.",
            exampleDescription: "사용자 없음."
        },
        {
            model: UserNotFoundException,
            exampleTitle: "인증오류 - 비밀번호 인증 오류",
            message: "Please check your email or password.",
            exampleDescription: "비밀번호 인증 오류"
        }
    ])
    async login(@Body() data: LoginInput): Promise<LoginOutput> {
        const result = await this.userService.login(data);
        return result;
    }

    @Post()
    async createAccount(
        @Body() data: CreateAccountInput,
    ): Promise<CreateAccountOutput> {
        const result = await this.userService.createAccount(data);
        return result;
    }

    @Put()
    async updateAccount(
        @Body() data: UpdateAccountInput,
    ): Promise<UpdateAccountOutput> {
        const result = await this.userService.updateAccount(data);
        return result;
    }
}
