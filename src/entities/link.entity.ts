import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(() => User, user => user.links)
    user: User;
}