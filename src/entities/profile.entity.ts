import { Column, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    bio: string;

    @Column({nullable: true})
    avatar: string;

    @Column({nullable: true})
    whatsapp_default: string;

    @OneToOne(() => User, user => user.profile, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User;
}