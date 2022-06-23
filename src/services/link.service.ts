import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindLinksQueryDto } from "src/dtos/find-links-query.dto";
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

    async findAll(queryDto: FindLinksQueryDto) {
        try {
            queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
            queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;
            const query = this.repository.createQueryBuilder('link');
            const {user} = queryDto;
            {user && query.where('link.user = :id', {id: user})}
            const [links, total] = await query.getManyAndCount();
            return {
                success: true,
                data: links,
                total: total
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async findOne(id: number) {
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

    async delete(id: number) {
        try {
            const link = await this.repository.findOne({where: {id}});

            if (!link) {
                throw new NotFoundException(`Link com o id ${id} não encontrado!`);
            }
    
            await this.repository.delete({ id });

            return {
                success: true,
                data: `${link.name} deletado com sucesso!`,
            }
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
    async toggleState(id: number, state: boolean, user: any) {
        try {
            const link = await this.repository.findOne({where: {id}});

            if (!link) {
                throw new NotFoundException(`Link com o id ${id} não encontrado!`);
            }
    
            await this.repository.update({ id }, {state});

            return {
                success: true,
                message: "Estado alterado com sucesso!",
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}