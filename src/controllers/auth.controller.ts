import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/services/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}


    @UseGuards(AuthGuard('localStrategyUser'))
    @Post('user')
    //@UseFilters(new HttpExceptionFilter())
    async loginUser(@Req() req: any) {
        return this.service.login(req.user);
    }
}