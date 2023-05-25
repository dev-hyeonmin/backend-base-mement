import { BadRequestException, Injectable, Type } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class PaginationService {
    constructor() { }

    async getList<T>(entity: Repository<any>, take: number, page: number): Promise<T[]> {
        if (page < 1) {
            throw new BadRequestException;
        }

        const list = entity.find({
            take,
            skip: (page - 1) * take,
        });

        return list;
    }
}
