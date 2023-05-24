import { Type } from "@nestjs/common";

export interface SuccessResponseOption {
    /**
     * 응답 디티오를 인자로받습니다
     * 예시 : ResponseRequestValidationDto
     */
    model: Type<any>;
    /**
     * 예시의 제목을 적습니다
     */
    exampleTitle: string;
    /**
     *  깊은 복사로 변경하고 싶은 응답값을 적습니다. 오버라이트 됩니다.
     *  nested 된 obj 인 경우엔 해당 obj 가 바뀌는것이아닌 안에 있는 property만 바뀝니다.
     *  즉 주어진 객체로 리프 프로퍼티에 대해 오버라이트됩니다.
     */
    overwriteValue?: Record<string, any>;
    /**
     * 어떠한 상황일 때 예시형태의 응답값을 주는지 기술 합니다.
     */
    exampleDescription: string;
    /**
     * 제네릭 형태가 필요할 때 기술합니다.
     * pageDto<generic> 인경우?
     */
    generic?: Type<any>;
}