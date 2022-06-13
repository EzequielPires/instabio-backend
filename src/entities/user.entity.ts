import { hashSync } from "bcrypt";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Link } from "./link.entity";
import { Product } from "./product.entity";
import { Profile } from "./profile.entity";
import { Social } from "./social.entity";

@Entity()
@Unique(["email", "user_name"])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    user_name: string;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @OneToOne(() => Profile, profile => profile.user)
    @JoinColumn()
    profile: Profile;

    @OneToOne(() => Social, social => social.user)
    social: Social;

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