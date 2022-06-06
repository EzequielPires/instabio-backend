import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    image: string;

    @Column({default: true})
    state: boolean;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    update_at: Date;

    @ManyToOne(() => User, user => user.products)
    user: User;
}