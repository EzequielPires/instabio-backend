import { hashSync } from "bcrypt";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Link } from "./link.entity";
import { Product } from "./product.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    user_name: string;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    update_at: Date;

    @OneToMany(() => Link, link => link.user)
    links: Link[];

    @OneToMany(() => Product, product => product.user)
    products: Product[];

    @BeforeInsert()
    hashPassword() {
      this.password = hashSync(this.password, 10);
    }
}