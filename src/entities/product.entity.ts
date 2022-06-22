import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Link } from "./link.entity";
import { User } from "./user.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    image: string;

    @Column({nullable: true})
    whatsapp: string;

    @Column({default: true})
    state: boolean;

    @OneToOne(() => Link, link => link.product, {onDelete: 'CASCADE'})
    @JoinColumn()
    link: Link;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    update_at: Date;

    @ManyToOne(() => User, user => user.products, {onDelete: 'CASCADE'})
    user: User;
}