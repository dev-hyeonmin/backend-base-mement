import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventDegree } from './entities/eventDegree.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventDegree])],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
