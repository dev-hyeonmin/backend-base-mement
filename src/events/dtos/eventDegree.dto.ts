import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { EventDegree } from "../entities/eventDegree.entity";

export class getEventDegreeOutput {
    @ApiProperty({
        type: EventDegree,
        description: "이벤트 차수 정보"
    })
    eventDegrees: EventDegree[];
};


export class CreateEventDegreeInput extends PickType(PartialType(EventDegree), ['degree', 'title', 'description', 'startAt', 'endAt']) { }