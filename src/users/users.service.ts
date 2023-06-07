import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
    CreateAccountInput,
    CreateAccountOutput,
    LoginInput,
    LoginOutput,
    UpdateAccountInput,
    UpdateAccountOutput,
    UserProfileOutput,
} from './dtos/users.dto';
import { TokenService } from 'src/token/token.service';
import { MailService } from 'src/mail/mail.service';
import { VerifyEmailOutput } from './dtos/verify-email.dto';
import * as dayjs from 'dayjs';
import * as bcrypt from 'bcryptjs';
import { Verification } from './entities/verification.entity';
import { UserNotFoundException, ValidationException } from 'src/common/errors';
import { USER_NOT_FOUND } from 'src/common/errors.constants';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
        @InjectRepository(Verification)
        private readonly verification: Repository<Verification>,
        private readonly tokenService: TokenService,
        private readonly mailService: MailService,
    ) { }

    async login({ email, password }: LoginInput): Promise<LoginOutput> {
        try {
            const user = await this.users.findOne({
                where: { email },
                select: ['id', 'password'],
            });

            if (!user) {
                throw new UserNotFoundException();
            }

            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                throw new UserNotFoundException('Please check your email or password.');
            }

            this.users.update(user.id, { lastLogin: this.getNow() });
            const token = await this.tokenService.sign(user.id);
            return { token };
        } catch (error) {
            throw error;
        }
    }

    async userFindById(id: number): Promise<UserProfileOutput> {
        try {
            const user = await this.users.findOne({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    lastLogin: true,
                }
            });
            if (!user) {
                throw new UserNotFoundException();
            }

            return { user };
        } catch (error) {            
            throw error;
        }
    }

    async createAccount({
        name,
        email,
        password,
    }: CreateAccountInput): Promise<CreateAccountOutput> {
        try {
            const isExists = await this.users.findOneBy({ email });
            if (isExists) {
                throw new UserNotFoundException();//'There is a user with that email already.'
            }

            const user = await this.users.save(
                this.users.create({ name, email, password }),
            );

            const verification = await this.verification.save(this.verification.create({ user }));
            this.mailService.send('validation', user.email, `Hello! ${user.name}`, { name: user.name, url: `?code=${verification.code}` });

            return { ok: true };
        } catch (error) {
            throw error;
        }
    }

    async updateAccount({
        name,
        email,
        password,
    }: UpdateAccountInput): Promise<UpdateAccountOutput> {
        try {
            const user = await this.users.findOneBy({ email });
            if (!user) {
                throw new UserNotFoundException();
            }

            if (name) {
                user.name = name;
            }
            if (email) {
                user.email = email;
            }
            if (password) {
                user.password = password;
            }

            user.verified = false;

            await this.users.save(user);

            return { ok: true };
        } catch (error) {
            throw error;
        }
    }

    async verifyEmail(code: string): Promise<VerifyEmailOutput> {
        try {
            if (!code) {
                throw new ValidationException;
            }
            
            const verification = await this.verification.findOne({ where: { code }, relations: ['user'] });
            
            if (verification) {
                this.users.save({
                    id: verification.user.id,
                    verified: true
                });
                this.verification.delete(verification.id);
                return { ok: true };
            }
            
            throw new ValidationException;
        } catch (error) {
            throw error;
        }
    }

    private getNow(): string {
        return dayjs().format('YYYY-MM-DD HH:mm:ss');
    }
}
