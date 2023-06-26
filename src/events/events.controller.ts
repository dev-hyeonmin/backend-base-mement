import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventGroupInput, GetEventGroupsInput, UpdateEventGroupInput } from './dtos/eventGroup.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Post('groups')
    @ApiOperation({ summary: '이벤트 그룹 생성' })
    create(@Body() createEventGroupInput: CreateEventGroupInput) {
        //
    }

    @Get('groups')
    @ApiOperation({ summary: '이벤트 그룹 리스트' })
    findAll(@Query() getEventGroupsInput: GetEventGroupsInput) {
        //
    }

    @Get('groups/:id')
    @ApiOperation({ summary: '이벤트 그룹 상세 조회' })
    findOne(@Param('id') id: string) {
        //
    }

    @Patch('groups/:id')
    @ApiOperation({ summary: '이벤트 그룹 수정' })
    update(@Param('id') id: string, @Body() updateEventGroupInput: UpdateEventGroupInput) {
        //
    }

    @Delete('groups:id')
    @ApiOperation({ summary: '이벤트 그룹 삭제' })
    remove(@Param('id') id: string) {
        //
    }
}
