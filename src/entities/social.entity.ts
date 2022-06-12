import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Social {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User, user => user.social)
    user: User;

    @Column({default: null})
    instagram: string;
    
    @Column({default: null})
    facebook: string;

    @Column({default: null})
    tiktok: string;

    @Column({default: null})
    whatsapp: string;

    @Column({default: null})
    twitter: string;

    @Column({default: null})
    telegram: string;

    @Column({default: null})
    youtube: string;

    @Column({default: null})
    linkedin: string;
}