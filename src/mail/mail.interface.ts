import { TransportType } from "@nestjs-modules/mailer/dist/interfaces/mailer-options.interface";

export interface MailModuleOptions {
    fromMail: string; // 보내는 메일 주소
    testMail: string; // 받는 테스트 메일 주소 (개발자 모드)
    transport?: TransportType;
}