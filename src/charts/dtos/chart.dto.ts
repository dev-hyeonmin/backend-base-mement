import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Chart } from "../entities/chart.entity";
import { MarketingAgreeState } from "../entities/marketingAgree.entity";

export class GetChartsInput extends PickType(PartialType(Chart), ['code', 'name', 'phone']) {}

export class getChartsOutput {
    @ApiProperty({
        type: [Chart],
        description: "검색된 차트 리스트"
    })
    charts: Chart[];
};

export class getChartOutput {
    @ApiProperty({
        type: Chart,
        description: "차트 상세 정보"
    })
    chart: Chart;

    @ApiProperty({
        type: String,
        description: "마켓팅 활용동의 여부",
        example: MarketingAgreeState.Agree
    })
    marketingAgree: MarketingAgreeState;
};

export class CreateChartInput extends PickType(PartialType(Chart), ['name', 'phone', 'age', 'gender', 'memo']) { }

export class UpdateChartInput extends PickType(PartialType(Chart),['name', 'phone', 'age', 'gender', 'memo']) { }