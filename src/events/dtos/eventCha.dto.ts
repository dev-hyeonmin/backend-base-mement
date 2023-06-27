import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { EventCha } from "../entities/eventCha.entity";

export class GetEventChasInput extends PickType(PartialType(EventCha), ['type']) { }

export class getEventChasOutput {
    @ApiProperty({
        type: [EventCha],
        description: "이벤트 차수 리스트"
    })
    EventChas: EventCha[];
};

export class getEventChaOutput {
    @ApiProperty({
        type: EventCha,
        description: "이벤트 차수 정보"
    })
    EventChas: EventCha;
};


export class CreateEventChaInput extends PickType(PartialType(EventCha), ['startAt', 'endAt']) {
    @ApiProperty({
        type: Array,
        description: '이벤트 그룹 ID 배열',
        example: [10, 19],
    })
    products: number[];
}