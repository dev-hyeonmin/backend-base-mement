import { HttpStatus, applyDecorators } from "@nestjs/common"
import { SuccessResponseOption } from "./successResponseOption.interface"
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { SuccessCommonResponseDto } from "../dtos/sucessResponse.dto";
import { Type, makeInstanceByApiProperty } from "./makeInstanceByApiProperty";
import { mergeObjects } from "../util/mergeToObj";

export const SuccessResponse = (
    StatusCode: HttpStatus,
    succesResponseOptions: SuccessResponseOption[]
) => {
    const examples = succesResponseOptions
        .map((response: SuccessResponseOption) => {
            const commonResponseInstance = makeInstanceByApiProperty<SuccessCommonResponseDto<any>>(SuccessCommonResponseDto);

            const DtoModel = response.model;

            const dtoData = makeInstanceByApiProperty<typeof DtoModel>(
                DtoModel,
                response.generic
            );
            if (response.overwriteValue) {
                commonResponseInstance.result = mergeObjects(
                    {},
                    dtoData,
                    response.overwriteValue
                );
            } else {
                commonResponseInstance.result = dtoData;
            }

            if (response.status) {
                commonResponseInstance.statusCode = response.status;
            }
            
            return {
                [response.exampleTitle]: {
                    value: commonResponseInstance,
                    description: response.exampleDescription
                }
            };
        })
        .reduce(function (result, item) {
            Object.assign(result, item);
            return result;
        }, {});

    const extraModel = succesResponseOptions.map(e => {
        return e.model;
    }) as unknown as Type[];
    const setOfExtraModel = new Set(extraModel);
    const pathsOfDto = [...setOfExtraModel].map(e => {
        return { $ref: getSchemaPath(e) };
    });
    const extraGeneric = succesResponseOptions
        .map(e => {
            return e.generic;
        })
        .filter(e => e) as unknown as Type[];
    const pathsOfGeneric = extraGeneric.map(e => {
        return { $ref: getSchemaPath(e) };
    });

    return applyDecorators(
        ApiExtraModels(...extraModel, ...extraGeneric, SuccessCommonResponseDto),
        ApiResponse({
            status: StatusCode,
            content: {
                'application/json': {
                    schema: {
                        additionalProperties: {
                            $ref: getSchemaPath(SuccessCommonResponseDto)
                        },
                        oneOf: [...pathsOfDto, ...pathsOfGeneric]
                    },
                    examples: examples
                }
            }
        })
    );
}