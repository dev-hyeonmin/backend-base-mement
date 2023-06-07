import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';
import { ApiConflictResponse, ApiProperty, PickType } from '@nestjs/swagger';

export class LoginInput extends PickType(User, ['email', 'password']) {
    @ApiProperty({
        example:'user1',
        description:'비밀번호',
        required:true,
    })
    password: string;
}

export class LoginOutput {
    @ApiProperty({
        description:'토큰 값 (Default 12h)',
        required:true,
    })
    token?: string;
}

export class UserProfileOutput {
    @ApiProperty({
        example: 'User',
        description:'사용자 정보',
    })
    user?: User;
}

export class CreateAccountInput {
    name: string;
    email: string;
    password: string;
}

export class CreateAccountOutput {}

export class UpdateAccountInput {
    name?: string;
    email?: string;
    password?: string;
}

export class UpdateAccountOutput {}
