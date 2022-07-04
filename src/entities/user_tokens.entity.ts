import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserTokens {
    @PrimaryColumn('uuid')
    refresh_token: string;

    @ManyToOne(() => User, user => user.tokens)
    user: User;

    @Column()
    expires_date: Date;
}