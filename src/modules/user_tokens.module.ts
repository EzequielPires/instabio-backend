import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTokens } from "src/entities/user_tokens.entity";
import { UserTokensService } from "src/services/user_tokens.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserTokens])],
    controllers: [],
    providers: [UserTokensService],
    exports: [UserTokensService]
}) export class UserTokensModule {}