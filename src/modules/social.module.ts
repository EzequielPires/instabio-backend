import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialController } from 'src/controllers/social.controller';
import { Social } from 'src/entities/social.entity';
import { User } from 'src/entities/user.entity';
import { SocialService } from 'src/services/social.service';
import { LinkModule } from 'src/modules/link.module';
import { UserModule } from 'src/modules/user.module';
import { LinkService } from 'src/services/link.service';

@Module({

    imports: [
        TypeOrmModule.forFeature([Social]), 
        UserModule, 
        LinkModule,
    ],
    controllers: [SocialController],
    providers: [SocialService],
    exports: [],
})
export class SocialModule { }