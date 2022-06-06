import { BaseQueryParametersDto } from "./base-query-parameters.dto";

export class FindProductsQueryDto extends BaseQueryParametersDto {
    user: string;
}