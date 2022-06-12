import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from 'src/controllers/profile.controller';
import { Profile } from 'src/entities/profile.entity';
import { ProfileService } from 'src/services/profile.service';

@Module({
    imports: [TypeOrmModule.forFeature([Profile])],
    controllers: [ProfileController],
    providers: [ProfileService],
    exports: [],
})
export class ProfileModule { }