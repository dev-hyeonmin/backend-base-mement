import { BadRequestException, Injectable, Type } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GetListOutput } from './dtos/pagination.dto';

@Injectable()
export class PaginationService {
    constructor() { }

    async getList<T>(entity: Repository<any>, take: number, page: number, where?: any, order?: any): Promise<GetListOutput<T>> {
        if (page < 1) {
            throw new BadRequestException;
        }

        try {
            const [list, total] = await entity.findAndCount({
                take,
                skip: (page - 1) * take,
                where,
                order
            });
    
            return {
                list,
                total,
                currentPage: page,
                lastPage: Math.ceil(total / take),
            };   
        } catch (error) {
            
        }        
    }
}
