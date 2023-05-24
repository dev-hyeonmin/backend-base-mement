import { DynamicModule, Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailModuleOptions } from './mail.interface';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Global()
@Module({})
export class MailModule {
    static forRoot(options: MailModuleOptions): DynamicModule {
        return {
            module: MailModule,  
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options,
                },
                MailService
            ],
            imports: [
                MailerModule.forRoot({
                    transport: options.transport,
                    defaults: {
                        from: options.fromMail,
                    },
                    template: {
                        dir: __dirname + '/templates',
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                })
            ],
            exports: [MailService]
        }
    }
}
