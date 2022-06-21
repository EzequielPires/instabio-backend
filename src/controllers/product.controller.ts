import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FindProductsQueryDto } from 'src/dtos/find-products-query.dto';
import { Link } from 'src/entities/link.entity';
import { Product } from 'src/entities/product.entity';
import { compressImage } from 'src/helper/CompressImage';
import { editFileName, imageFileFilter } from 'src/helper/EditNameFile';
import { LinkService } from 'src/services/link.service';
import { ProductService } from 'src/services/product.service';


@Controller('products')
export class ProductController {
    constructor(
        private readonly service: ProductService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: './storage/temp',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    @Post('')
    async create(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
        const path = await compressImage(file);
        return await this.service.create(path, req.user);
    }

    @Get('')
    findAll(@Query() queryDto: FindProductsQueryDto) {
        return this.service.findAll(queryDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return `find id`
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: Product) {
        return `update id`
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('add-link/:id')
    addLink(@Param('id', ParseIntPipe) id: number, @Body() body: Link, @Req() req: any) {
        return this.service.addLink(id, body, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('state/:id')
    toggleState(@Param('id', ParseIntPipe) id: number, @Body() body: Link, @Req() req: any) {
        return this.service.toggleState(id, body.state, req.user);
    }
}