import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Link } from "./link.entity";
import { User } from "./user.entity";

@Entity()
export class Social {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User, user => user.social)
    @JoinColumn()
    user: User;

    @OneToMany(() => Link, link => link.social)
    links: Link[];
}