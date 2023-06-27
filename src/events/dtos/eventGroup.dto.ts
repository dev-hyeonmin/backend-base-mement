import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { EventGroup } from "../entities/EventGroup.entity";

export class GetEventGroupsInput extends PickType(PartialType(EventGroup), ['name']) { }

export class getEventGroupsOutput {
    @ApiProperty({
        type: [EventGroup],
        description: "이벤트 그룹 리스트"
    })
    EventGroups: EventGroup[];
};

export class getEventGroupOutput {
    @ApiProperty({
        type: EventGroup,
        description: "이벤트 그룹 정보"
    })
    EventGroups: EventGroup;
};

export class CreateEventGroupInput extends PickType(PartialType(EventGroup), ['name']) {
    @ApiProperty({
        type: [Number],
        description: '상품 ID 배열',
        example: [10, 19],
    })
    products: number[];
}

export class UpdateEventGroupInput extends PickType(PartialType(EventGroup), ['name']) {
    @ApiProperty({
        type: Array,
        description: '상품 ID 배열',
        example: [10, 19],
    })
    products: number[];
}

