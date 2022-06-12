import { BaseQueryParametersDto } from "./base-query-parameters.dto";

export class FindUserQueryDto extends BaseQueryParametersDto {
    id: string;
    user_name: string;
}