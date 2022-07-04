import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserTokens } from "src/entities/user_tokens.entity";
import { isValidHours } from "src/helper/DateHelpers";
import { Repository } from "typeorm";

@Injectable()
export class UserTokensService {
    constructor(
        @InjectRepository(UserTokens) private repository: Repository<UserTokens>
    ) { }

    async create(body: UserTokens) {
        try {
            const token = this.repository.create(body);
            return await this.repository.save(token);
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }
    async delete(id: string) {
        try {
            const token = await this.repository.findOne({
                where: {refresh_token: id}
            });
            if(!token) {
                throw new Error("Token not found.");
            }

            await this.repository.delete({refresh_token: id});
            return {
                success: true,
                message: "Token deletado com sucesso"
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
    async isValid(id: string) {
        try {
            const token = await this.repository.findOne({
                relations: ['user'],
                where: {refresh_token: id}
            });

            if(!token) {
                throw new Error("Token de recuperação de senha inválido.");
            }

            return {
                isValid: isValidHours(token.expires_date),
                user: token.user
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }
}