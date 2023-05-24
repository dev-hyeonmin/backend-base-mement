import { HttpStatus, applyDecorators } from "@nestjs/common"
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { Type, makeInstanceByApiProperty } from "./makeInstanceByApiProperty";
import { ErrorResponseOption } from "./errorResponseOption.interface";
import { HttpExceptionErrorResponseDto } from "../dtos/httpExceptionErrorResponse.dto";
import { ErrorCommonResponse } from "../dtos/errorCommonResponse.dto";

export const ErrorResponse = (
    StatusCode: HttpStatus,
    errorResponseOptions: ErrorResponseOption[]
) => {
    let flagValidationErrorExist = false;
    const examples = errorResponseOptions
        .map((error: ErrorResponseOption) => {
            let innerErrorDto;
            if (typeof error.message !== 'string') {
                throw Error('http오류는 넘겨줄때 string 타입으로 주셔야합니다.');
            }
            // innerErrorDto = new HttpExceptionErrorResponseDto(
            //     StatusCode,
            //     error.model.name,
            //     error.message,
            //     error.code
            // );
            const commonErrorInstance =
                makeInstanceByApiProperty<ErrorCommonResponse<any>>(
                    ErrorCommonResponse
                );
            commonErrorInstance.error = error.message;
            return {
                [error.exampleTitle]: {
                    value: commonErrorInstance,
                    description: error.exampleDescription
                }
            };
        })
        .reduce(function (result, item) {
            Object.assign(result, item);
            return result;
        }, {}); // null 값 있을경우 필터링
    
    return applyDecorators(
        ApiExtraModels(
            ErrorCommonResponse,
            HttpExceptionErrorResponseDto
        ),
        ApiResponse({
            status: StatusCode,
            content: {
                'application/json': {
                    schema: {
                        additionalProperties: { $ref: getSchemaPath(ErrorCommonResponse) },
                        oneOf: flagValidationErrorExist
                            ? [
                                { $ref: getSchemaPath(HttpExceptionErrorResponseDto) }
                            ]
                            : [{ $ref: getSchemaPath(HttpExceptionErrorResponseDto) }]
                    },
                    examples: examples
                }
            }
        })
    );
}