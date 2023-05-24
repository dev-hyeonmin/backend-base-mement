import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interface';
import { TemplateContexts } from './templates/templates.interface';

@Injectable()
export class MailService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly option: MailModuleOptions,
        private readonly mailerService: MailerService
    ) { }

    /*
     * template: 이메일 템플릿
     * sendMail: 받는 사람 (development로 실행 시 테스트 메일 주소로 발송)
     * 
     */
    send(template: string, sendMail: string, subject: string, conts: TemplateContexts) {
        const msg: ISendMailOptions = {
            to: this.option.testMail ? this.option.testMail : sendMail,
            subject: subject,
            template: `./${template}`,
            context: conts
        }

        this.mailerService.sendMail(msg).then(() => {
            console.log('Email sent.');
        }).catch((error) => {
            console.log(error);
        });
    }
}
