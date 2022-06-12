import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialController } from 'src/controllers/social.controller';
import { Social } from 'src/entities/social.entity';
import { SocialService } from 'src/services/social.service';

@Module({

    imports: [TypeOrmModule.forFeature([Social])],
    controllers: [SocialController],
    providers: [SocialService],
    exports: [],
})
export class SocialModule { }