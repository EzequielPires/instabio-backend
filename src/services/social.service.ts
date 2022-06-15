import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Link } from "src/entities/link.entity";
import { Social } from "src/entities/social.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { LinkService } from "./link.service";

@Injectable()
export class SocialService {
    constructor(
        @InjectRepository(Social) private socialRepository: Repository<Social>,
        private readonly linkService: LinkService
    ) { }

    verifyExistLink(links, name) {
        let exist:boolean = false;
        {links && links.forEach(link => {
            {link.name === name ? exist = true : null}
        })}
        return exist;
    }

    async create(body: Link, user: any) {
        try {
            const query = this.socialRepository.createQueryBuilder('social')
            .leftJoinAndSelect('social.user', 'user')
            .leftJoinAndSelect('social.links', 'links')
            .where('user.id = :id', {id: user.id});
            const socialExist = await query.getOne();
            let social:Social; 
            if(!socialExist) {
                let socialTemp = this.socialRepository.create({user: user.id});
                social = await this.socialRepository.save(socialTemp);
            } else {
                social = socialExist;
            }
            if(this.verifyExistLink(social.links, body.name)) {
                throw new Error('Link já existe');
            }
            await this.linkService.addSocial(body, social.id);
            return {
                success: true,
                data: await query.getOne()
            }
        } catch (error) {
            return {
                message: error.message
            }
        }
        
    }

    async findAll() {

    }

    async findOne() {

    }

    async update() {

    }

    async delete() {

    }
}