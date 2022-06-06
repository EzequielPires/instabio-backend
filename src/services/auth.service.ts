import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcrypt";
import { User } from "src/entities/user.entity";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email };
        
        return {
            success: true,
            user: {
                id: user.id,
                user_name: user.user_name,
                email: user.email
            },
            token: this.jwtService.sign(payload),
        };
    }

    async validateUser(user_name: string, password: string) {
        let user: User;
        try {
            user = await this.userService.findOneOrFail(user_name);
        } catch (error) {
            return null;
        }

        const isPasswordValid = compareSync(password, user.password);
        if (!isPasswordValid) return null;

        return user;
    }
}