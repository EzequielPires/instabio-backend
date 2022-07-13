import { Controller, Get, Param, Put, Res } from '@nestjs/common';
import { S3Service } from 'src/services/s3.service';

@Controller('storage')
export class StorageController {
    constructor(private readonly s3Service: S3Service) {}
    @Get(':key')
    view(@Param('key') key: string, @Res() res: any) {
        /* const readStream = this.s3Service.getFileStream(key);
        return readStream.pipe(res); */
    }
}