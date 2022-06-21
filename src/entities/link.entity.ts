import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Social } from "./social.entity";
import { User } from "./user.entity";

@Entity()
export class Link {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    link: string;

    @Column({default: true})
    state: boolean;

    @OneToOne(() => Product, product => product.link)
    product: Product;

    @ManyToOne(() => User, user => user.links, {onDelete: 'CASCADE'})
    user: User;

    @ManyToOne(() => Social, social => social.links, {onDelete: 'CASCADE'})
    social: Social;
}