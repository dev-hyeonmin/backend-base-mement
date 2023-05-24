import { CoreEntity } from 'src/common/core.entity';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
    Admin = 'Admin',
    Doctor = 'Doctor',
}

@Entity()
export class User extends CoreEntity {
    @Column({ type: String })
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

    @Column({ type: 'enum', enum: UserRole, default: UserRole.Doctor })
    role: UserRole;

    @Column({ type: Boolean, default: false })
    verified: boolean;

    @UpdateDateColumn()
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
