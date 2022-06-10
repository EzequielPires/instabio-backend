import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FindProductsQueryDto } from 'src/dtos/find-products-query.dto';
import { Product } from 'src/entities/product.entity';
import CustomStorage from 'src/helper/CustomStorage';
import { editFileName, imageFileFilter } from 'src/helper/EditNameFile';
import { ProductService } from 'src/services/product.service';

var storage = CustomStorage({
    destination: function (req, file, cb) {
      cb(null, './storage/items' + file.originalname)
    }
  })

@Controller('products')
export class ProductController {
    constructor(private readonly service: ProductService) {}

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: storage,
        fileFilter: imageFileFilter,
    }))
    @Post('')
    create(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
        return this.service.create(file.path, req.user);
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
}