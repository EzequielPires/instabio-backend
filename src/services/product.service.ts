import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindProductsQueryDto } from "src/dtos/find-products-query.dto";
import { Link } from "src/entities/link.entity";
import { Product } from "src/entities/product.entity";
import { Repository } from "typeorm";
import { LinkService } from "./link.service";

export class ProductService {
    constructor(
        @InjectRepository(Product) private repository: Repository<Product>,
        @InjectRepository(Link) private repositoryLink: Repository<Link>,
        private readonly linkService: LinkService
    ) { }

    async create(image: string, user: any) {
        try {
            const product = this.repository.create({ image, user });

            return {
                success: true,
                data: await this.repository.save(product),
            }
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }

    async findAll(queryDto: FindProductsQueryDto) {
        try {
            queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
            queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;
            const query = this.repository.createQueryBuilder('product');
            query.leftJoinAndSelect('product.link', 'link');
            query.leftJoinAndSelect("product.user", "user");

            const { user } = queryDto;
            { user && query.andWhere('product.user.id = :id', { id: `${user}` }) }

            const [products, total] = await query.getManyAndCount();

            return {
                success: true,
                data: products,
                total: total
            }
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }

    async findOne(id: number) {
        try {
            const product = await this.repository.findOne({ where: { id } });

            if (!product) {
                throw new NotFoundException(`Produto com o id ${id} não encontrado!`);
            }
            return {
                success: true,
                data: product,
            }
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }

    async update(id: number, body: Product) {
        const product = await this.repository.findOne({ where: { id } });

        if (!product) {
            throw new NotFoundException(`Produto com o id ${id} não encontrado!`);
        }

        await this.repository.update({ id }, body);
        try {
            return {
                success: true,
                data: body,
            }
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }

    async delete(id: number) {
        const product = await this.repository.findOne({ where: { id } });

        if (!product) {
            throw new NotFoundException(`Produto com o id ${id} não encontrado!`);
        }

        await this.repository.delete({ id });
        try {
            return {
                success: true,
                data: `Produto com o id ${id} deletado com sucesso!`,
            }
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }

    async addLink(id: number, body: Link, user: any) {
        try {
            const product = await this.repository.findOne({ where: { id } });

            if (!product) {
                throw new NotFoundException(`Produto com o id ${id} não encontrado!`);
            }

            const link = this.repositoryLink.create({...body, product});

            return {
                success: true,
                data: await this.repositoryLink.save(link)
            }
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }
    async addWpp(id: number, whatsapp: string) {
        try {
            const product = await this.repository.findOne({ where: { id } });

            if (!product) {
                throw new NotFoundException(`Produto com o id ${id} não encontrado!`);
            }

            await this.repository.update({id}, {whatsapp});

            return {
                success: true,
                message: 'WhatsApp adicionado com sucesso'
            }
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }

    async toggleState(id: number, state: boolean, user: any) {
        try {
            const product = await this.repository.findOne({ relations: ['user'], where: { id } });

            if (!product) {
                throw new NotFoundException(`Produto com o id ${id} não encontrado!`);
            }
            if (user.id != product.user.id) {
                throw new UnauthorizedException('Você não tem permição para está ação!');
            }
            await this.repository.update({ id }, { state });
            return {
                success: true,
                data: await this.repository.findOne({ where: { id } })
            }
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }
}