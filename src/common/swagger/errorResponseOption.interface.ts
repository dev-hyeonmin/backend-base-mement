import { HttpException, Type } from "@nestjs/common";

export interface ErrorResponseOption {
    /**
     * HttpException을 extend한 에러 타입을 인자로 받습니다.
     * 예시 : BadRequestException
     */
    model: Type<HttpException>;
    /**
     * 예시의 제목을 적습니다
     */
    exampleTitle: string;
    /**
     * 오류 코드
     */
    status?: number;
    /**
     * 오류 발생 경로
     */
    path?: string;
    /**
     * 서비스 레이어에서 적었던 오류 메시지를 기술합니다.
     */
    message: string | Record<string, Array<string>>;
    /**
     * 어떠한 상황일 때 오류가나는지 기술합니다.
     */
    exampleDescription?: string;
    /**
     * 에러 코드에 대해 기술합니다.
     */
    code?: string;
}