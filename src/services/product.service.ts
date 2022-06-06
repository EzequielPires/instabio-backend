import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindProductsQueryDto } from "src/dtos/find-products-query.dto";
import { Product } from "src/entities/product.entity";
import { Repository } from "typeorm";

export class ProductService {
    constructor(@InjectRepository(Product) private repository: Repository<Product>) { }

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

            const { user } = queryDto;
            query.leftJoinAndSelect("product.user", "user");
            {user && query.andWhere('product.user.id = :id', {id: `${user}`})}
            
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
}