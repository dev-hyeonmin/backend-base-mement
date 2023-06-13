import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Chart } from "../entities/chart.entity";
import { MarketingAgree } from "../entities/marketingAgree.entity";

export class CreateMarketingAgreeInput extends PickType(MarketingAgree, ['status']) {}