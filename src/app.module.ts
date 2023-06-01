import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { TokenMiddleware } from './token/token.middleware';
import { MailModule } from './mail/mail.module';
import { Verification } from './users/entities/verification.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { SubCategory } from './categories/entities/subCategory.entity';
import { Board } from './boards/entities/board.entity';
import { BoardsModule } from './boards/boards.module';
import { PaginationModule } from './pagination/pagination.module';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath:
                process.env.NODE_ENV === 'production' ? '.env' : '.env.dev',
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            entities: [User, Verification, Category, SubCategory, Board, Comment],
        }),
        TokenModule.forRoot({
            privateKey: process.env.PRIVATE_KEY,
            expiresIn: process.env.EXPIRESIN,
        }),
        MailModule.forRoot({
            fromMail: process.env.FROM_MAIL,
            testMail: process.env.NODE_ENV === 'production' ? '' : process.env.TEST_MAIL,
            transport: {
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                  user: process.env.FROM_MAIL,
                  pass: process.env.FROM_MAIL_PASSWORD,
                },
              },
        }),
        UsersModule,
        AuthModule,
        CategoriesModule,
        BoardsModule,
        PaginationModule,
        CommentsModule,
        WebsocketsModule,
    ],
    controllers: [],
    providers: [],
})
// export class AppModule { }
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TokenMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL,
        });
    }
}
