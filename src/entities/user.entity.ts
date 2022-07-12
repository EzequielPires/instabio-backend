import { hashSync } from "bcrypt";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Link } from "./link.entity";
import { Product } from "./product.entity";
import { Profile } from "./profile.entity";
import { Social } from "./social.entity";
import { UserTokens } from "./user_tokens.entity";
import { Role } from "../models/role.enum";

@Entity()
@Unique(["email", "user_name"])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  user_name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
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

  @OneToMany(() => UserTokens, user_tokens => user_tokens.user)
  tokens: UserTokens[];

  @Column({ type: 'enum', enum: Role, default: Role.Free })
  roles: Role;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}