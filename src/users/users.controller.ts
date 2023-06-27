import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, UnauthorizedException } from '@nestjs/common';
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
import { ApiOkResponse, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/swagger/errorResponse.decorator';
import { UserNotFoundException } from 'src/common/errors';
import { USER_NOT_FOUND } from 'src/common/errors.constants';
import { Roles } from 'src/auth/roles.decorator';
import { User } from './entities/user.entity';

/*
 * GET    : getting data
 * POST   : creating data
 * PUT    : updating data
 * DELETE : deleting data
 */

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    // @Get('verification')
    // async verifyEmail(@Req() data: any): Promise<VerifyEmailOutput> {
    //     return this.userService.verifyEmail(data.query.code);
    // }

    @Get(':id')
    @Roles(['Any'])
    @ApiSecurity('x-jwt')
    @ApiOperation({ summary: '사용자 정보 조회' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: UserProfileOutput,
            exampleTitle: 'Success',
            exampleDescription: ''
        }
    ])
    @ErrorResponse(USER_NOT_FOUND, [
        {
            model: UserNotFoundException,
            exampleTitle: "인증오류 - 유저없음",
            status: USER_NOT_FOUND,
            message: "User Not Found.",
            path: "/users/:id"
        },
    ])
    async userFindById(@Param('id') id: number): Promise<UserProfileOutput> {
        const result = await this.userService.userFindById(id);
        return result;
    }

    @Post('login')
    @ApiOperation({ summary: '로그인' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: LoginOutput,
            exampleTitle: 'Success login',
        }
    ])
    @ErrorResponse(USER_NOT_FOUND, [
        {
            model: UserNotFoundException,
            exampleTitle: "인증오류 - 유저없음",
            status: USER_NOT_FOUND,
            path: '/users/login',
            message: "User Not Found.",
        },
        {
            model: UserNotFoundException,
            exampleTitle: "인증오류 - 비밀번호 인증 오류",
            status: USER_NOT_FOUND,
            path: '/users/login',
            message: "Please check your email or password.",
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

    @Delete(':id')
    @ApiOperation({ summary: '사용자 삭제' })
    remove(@Param('id') id: string) {
        //
    }
}
