import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user.controller';
import { User } from 'src/entities/user.entity';
import { NodemailerService } from 'src/services/nodemailer.service';
import { UserService } from 'src/services/user.service';
import { UserTokensModule } from './user_tokens.module';

@Module({

    imports: [TypeOrmModule.forFeature([User]), NodemailerService, UserTokensModule],
    controllers: [UserController],
    providers: [UserService, NodemailerService],
    exports: [UserService],
})
export class UserModule { }