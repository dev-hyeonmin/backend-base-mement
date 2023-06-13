import { CoreEntity } from 'src/common/entities/core.entity';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    OneToMany,
    UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from 'src/reservation/entities/reservation.entity';

export enum UserRole {
    Admin = 'Admin',
    User = 'User',
}

@Entity()
export class User extends CoreEntity {
    @Column({ type: String })
    @ApiProperty({
        example:'홍길동',
        description:'이름',
        required:true,
    })
    name: string;

    @Column({ type: String })
    @ApiProperty({
        example:'user1@gmail.com',
        description:'이메일',
        required:true,
    })
    email: string;

    @Column({ type: String })        
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
    role: UserRole;

    @Column({ type: Boolean, default: false })
    verified: boolean;

    @UpdateDateColumn()
    @ApiProperty({
        example:'2023-01-01 10:00:00',
        description:'마지막 로그인 시간',
    })
    lastLogin: string;    

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10);
            } catch (error) {
                console.log(error);
                throw new InternalServerErrorException();
            }
        }
    }
}
