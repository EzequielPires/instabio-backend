import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "src/entities/profile.entity";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

export class ProfileService {
    constructor(
        @InjectRepository(Profile) private repository: Repository<Profile>,
    ) { }

    async create(body: Profile, user: any) {
        try {
            const profile = this.repository.create({...body, user});
            return {
                success: true,
                data: await this.repository.save(profile),
            }
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }

    async findAll() {
        try {
            const profiles = await this.repository.find();
            return {
                success: true,
                data: profiles,
            }
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }

    async findOne(id: string) {
        try {
            const profile = await this.repository.findOne({ where: { id } });
            if (!profile) {
                throw new NotFoundException('Perfil de usuário não encontrado!');
            }
            return {
                success: true,
                data: profile,
            }
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }

    async update(id: string, body: Profile) {
        try {
            const profile = await this.repository.findOne({ where: { id } });
            if (!profile) {
                throw new NotFoundException('Perfil de usuário não encontrado!');
            }
            await this.repository.update({ id }, body);
            return {
                success: true,
                data: { id, ...body },
            }
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }

    async delete(id: string) {
        try {
            const profile = await this.repository.findOne({ where: { id } });
            if (!profile) {
                throw new NotFoundException('Perfil de usuário não encontrado!');
            }
            await this.repository.delete({ id })
            return {
                success: true,
                data: `Perfil ${profile.title} apagado com sucesso!`,
            }
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }

    async upload(id: string, path: string) {
        try {
            const profile = await this.repository.findOne({ where: { id } });
            if (!profile) {
                throw new NotFoundException('Perfil de usuário não encontrado!');
            }
            await this.repository.update({ id }, { avatar: path })
            return {
                success: true,
                data: `Upload realizado com sucesso!`,
            }
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }
}