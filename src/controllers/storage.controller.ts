import { Controller, Get, Param, Put, Res } from '@nestjs/common';

@Controller('storage')
export class StorageController {
    constructor() {}
    @Get(':imgpath')
    view(@Param('imgpath') path: string, @Res() res: any) {
        return res.sendFile(path, { root: './storage' });
    }
}