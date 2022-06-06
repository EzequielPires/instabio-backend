import { InjectRepository } from "@nestjs/typeorm";
import { Link } from "src/entities/link.entity";
import { Repository } from "typeorm";

export class LinkService {
    constructor(@InjectRepository(Link) private repository: Repository<Link>) { }

    async create(body: Link, user: any) {
        try {
            const link = this.repository.create({...body, user: user.id});
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
            const links = await this.repository.find({relations: ['user']});
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

    async update() {
        try {

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
}