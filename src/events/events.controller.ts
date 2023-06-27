import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventGroupInput, GetEventGroupsInput, UpdateEventGroupInput } from './dtos/eventGroup.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEventChaInput } from './dtos/eventCha.dto';

@ApiTags('events')
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Post('cha')
    @ApiOperation({ summary: '이벤트 차수 생성 / 수정' })
    createEventCha(@Body() createEventChaInput: CreateEventChaInput) {
        //
    }

    @Get('cha')
    @ApiOperation({ summary: '이벤트 차수 리스트' })
    getEventChaList() {
        //
    }

    @Get('cha/:type') 
    getEventCha(@Param('type') type: string) {
        //
    }

    /**
     * Group
     */
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
