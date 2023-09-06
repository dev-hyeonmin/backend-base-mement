import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventDegree } from './entities/eventDegree.entity';
import { Repository } from 'typeorm';
import { CreateEventDegreeInput, getEventDegreeOutput } from './dtos/eventDegree.dto';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventDegree)
        private readonly eventDegrees: Repository<EventDegree>,
    ) { }


    async createEventDegree({ degree, title, description, startAt, endAt }: CreateEventDegreeInput) {
        try {
            if (!degree) {
                return {
                    ok: false,
                    error: 'Degree is essential data.'
                }
            }

            const degreeData = await this.eventDegrees.findOneBy({ degree });
            
            if (title) {
                degreeData.title = title;
            }
            if (description) {
                degreeData.description = description;
            }
            if (startAt) {
                degreeData.startAt = startAt;
            }
            if (endAt) {
                degreeData.endAt = endAt;
            }

            if (!degreeData) {
                const newData = await this.eventDegrees.save(
                    this.eventDegrees.create({ degree, title, description, startAt, endAt }),
                );

            } else {
                await this.eventDegrees.save(degreeData);
            }
            return { ok: true };
        } catch (error) {

        }
    }

    async getEventDegree(): Promise<getEventDegreeOutput> {
        try {
            const eventDegrees = await this.eventDegrees.find({});
            return { eventDegrees };
        } catch (error) {
            throw error;
        }
    }
}
