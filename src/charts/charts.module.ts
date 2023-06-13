import { Module } from '@nestjs/common';
import { ChartsController } from './charts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chart } from './entities/chart.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Chart])],
    controllers: [ChartsController]
})
export class ChartsModule { }
