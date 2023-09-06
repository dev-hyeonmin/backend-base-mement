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
import { WebsocketsModule } from './websockets/websockets.module';
import { ProductsModule } from './products/products.module';
import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from './reservation/entities/reservation.entity';
import { ChartsModule } from './charts/charts.module';
import { Chart } from './charts/entities/chart.entity';
import { MarketingAgree } from './charts/entities/marketingAgree.entity';
import { Product } from './products/entities/product.entity';
import { ProceduresModule } from './procedures/procedures.module';
import { Procedure } from './procedures/entities/Procedure.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/Category.entity';
import { ReservationLimitCount } from './reservation/entities/reservationLimitCount.entity';
import { Holiday } from './reservation/entities/holiday.entity';
import { PaymentsModule } from './payments/payments.module';
import { Payment } from './payments/entities/payment.entity';
import { PaymentProduct } from './payments/entities/payment_product.entity';
import { EventsModule } from './events/events.module';
import { EventGroup } from './events/entities/eventGroup.entity';
import { EventCha } from './events/entities/eventCha.entity'; 

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
            entities: [
                User,
                Verification,
                Chart,
                Reservation,
                MarketingAgree,
                Product,
                Procedure,
                Category,
                ReservationLimitCount,
                Holiday,
                Payment,
                PaymentProduct,
                EventCha,
                EventGroup,
            ],
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
        WebsocketsModule,
        ProductsModule,
        ReservationModule,
        ChartsModule,
        ProceduresModule,
        CategoriesModule,
        PaymentsModule,
        EventsModule,
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
