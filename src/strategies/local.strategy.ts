import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'localStrategyUser') {
    constructor(private authService: AuthService) {
        super({ usernameField: 'user_name' });
    }

    async validate(user_name: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(user_name, password);
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}