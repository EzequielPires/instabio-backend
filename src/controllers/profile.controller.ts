import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Profile } from 'src/entities/profile.entity';
import { compressImage } from 'src/helper/CompressImage';
import { editFileName, imageFileFilter } from 'src/helper/EditNameFile';
import { ProfileService } from 'src/services/profile.service';

@Controller('profiles')
export class ProfileController {
    constructor(private readonly service: ProfileService) {}

    @UseGuards(JwtAuthGuard)
    @Post('')
    create(@Body() body: Profile, @Req() req: any) {
        return this.service.create(body, req.user);
    }

    @Get('')
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() body: Profile) {
        return this.service.update(id, body);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id) {
        return this.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: './storage/avatars',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    @Patch('/upload-avatar/:id')
    async upload(@Param('id', ParseUUIDPipe) id: string, @UploadedFile() file: Express.Multer.File) {
        const path = await compressImage(file);
        return this.service.upload(id, path);
    }
}