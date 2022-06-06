import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { UserModel } from "src/models/user.model";
import { FindOneOptions, Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repository: Repository<User>) { }

    isBlank(value: string) {
        if(!value || value === '') {
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

    async findAll() {
        try {
            const users = await this.repository.find();
            return {
                success: true,
                data: users
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
}