import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindUserQueryDto } from "src/dtos/find-user-query.dto";
import { User } from "src/entities/user.entity";
import { UserModel } from "src/models/user.model";
import { Repository } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { addHours } from "src/helper/DateHelpers";
import { NodemailerService } from "./nodemailer.service";
import { UserTokensService } from "./user_tokens.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private repository: Repository<User>,
        private nodemailerService: NodemailerService,
        private userTokenService: UserTokensService,
    ) { }

    isBlank(value: string) {
        if (!value || value === '') {
            throw new Error('Valores não podem ser em branco!');
        }
    }

    async create(body: UserModel) {
        try {
            this.isBlank(body.email);
            this.isBlank(body.password);
            this.isBlank(body.user_name);
            const user = this.repository.create(body);
            return {
                success: true,
                data: await this.repository.save(user)
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async findAll(queryDto: FindUserQueryDto) {
        try {
            queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
            queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;
            const query = this.repository.createQueryBuilder('user');
            query.leftJoinAndSelect(
                "user.products",
                "product",
                "product.state = true"
            );
            query.leftJoinAndSelect("product.link", "link");
            query.leftJoinAndSelect("user.profile", "profile");
            query.leftJoinAndSelect(
                "user.links",
                "links",
                "links.state = true",
            );
            query.leftJoinAndSelect("user.social", "social");
            query.leftJoinAndSelect("social.links", "links_social");

            const { id, user_name } = queryDto;

            { id && query.andWhere('user.id = :id', { id: id }) }
            { user_name && query.andWhere('user.user_name = :user_name', { user_name: user_name }) }

            const [users, total] = await query.getManyAndCount();
            return {
                success: true,
                data: users,
                total: total
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async findOne(id: string) {
        try {
            const user = await this.repository.findOne({ where: { id } });
            return {
                success: true,
                data: user
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async update(id: string, body: UserModel) {
        try {
            const user = await this.repository.findOne({ where: { id } });
            if (!user) {
                throw new NotFoundException('Usuário não encontrado');
            }
            this.repository.update({ id }, body);
            return {
                success: true,
                data: body
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async delete(id: string) {
        const user = await this.repository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        this.repository.delete({ id })
        return {
            success: true,
            data: `${user.user_name} removido com sucesso`
        }
    }

    async findOneOrFail(user_name: string) {
        try {
            const user = await this.repository.findOneOrFail({
                where: { user_name }
            });
            return user;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async findByEmail(email: string) {
        try {
            const user = await this.repository.findOneOrFail({
                where: { email }
            });
            return user;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async sendForgotPassword(email: string) {
        try {
            const user = await this.findByEmail(email);

            if (!user) {
                throw new Error("Usuário com esse email não existe!");
            }

            const refresh_token = uuidV4();

            const expires_date = addHours(3);

            const userToken = await this.userTokenService.create({
                expires_date,
                refresh_token,
                user
            });

            const messageOptions = {
                email: 'ezequiel.pires082000@gmail.com',
                token: refresh_token,
                title: 'Teste de email',
                body: `<a href='http://localhost:3001/reset-password?token=${refresh_token}&user=${user.id}'>Reset password</a>`
            }

            
            const response = await this.nodemailerService.sendEmail(messageOptions);
            if(!response.success) {
                throw new Error("Falha ao enviar email com recuperação de senha.")
            }

            return {
                success: true,
                message: "Email com recuperação de senha enviado com sucesso.",
                data: userToken
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async resetPassword(token: string, password: string, repeat_password: string) {
        try {
            const {isValid, user} = await this.userTokenService.isValid(token);
            if(!isValid) {
                throw new Error("Token de recuperação de senha inválido.");
            }
            if(password != repeat_password) {
                throw new Error("As senhas devem ser iguais.");
            }

            user.password = password;

            await this.repository.save(user);

            await this.userTokenService.delete(token);

            return {
                success: true,
                message: "Senha alterada com sucesso!"
            };
        } catch (error) {
            return {
                success: false,
                message: error.message 
            }
        }
    }
}