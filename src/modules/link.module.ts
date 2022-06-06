import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkController } from 'src/controllers/link.controller';
import { Link } from 'src/entities/link.entity';
import { LinkService } from 'src/services/link.service';

@Module({
    imports: [TypeOrmModule.forFeature([Link])],
    controllers: [LinkController],
    providers: [LinkService],
    exports: [],
})
export class LinkModule { }