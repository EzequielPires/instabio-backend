import { BaseQueryParametersDto } from "./base-query-parameters.dto";

export class FindLinksQueryDto extends BaseQueryParametersDto {
    user: string;
}