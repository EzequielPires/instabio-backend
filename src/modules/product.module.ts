import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from 'src/controllers/product.controller';
import { Link } from 'src/entities/link.entity';
import { Product } from 'src/entities/product.entity';
import { ProductService } from 'src/services/product.service';
import { LinkModule } from './link.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, Link]),
        LinkModule
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductModule { }