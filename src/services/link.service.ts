import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Link } from "src/entities/link.entity";
import { Repository } from "typeorm";

export class LinkService {
    constructor(@InjectRepository(Link) private repository: Repository<Link>) { }

    async create(body: Link, user: any) {
        try {
            const link = this.repository.create({ ...body, user: user.id });
            return {
                success: true,
                data: await this.repository.save(link)
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
            const links = await this.repository.find({ relations: ['user'] });
            return {
                success: true,
                data: links
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async findOne() {
        try {

        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async update(id: number, body: Link) {
        try {
            const link = await this.repository.findOne({where: {id}});

            if (!link) {
                throw new NotFoundException(`Link com o id ${id} não encontrado!`);
            }
    
            await this.repository.update({ id }, body);

            return {
                success: true,
                data: body,
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async delete() {
        try {

        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async addSocial(body: Link, id: any) {
        try {
            const link = this.repository.create({
                ...body,
                social: id,
            });
            return {
                success: true,
                data: await this.repository.save(link)
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}