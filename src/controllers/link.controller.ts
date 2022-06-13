import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    ParseIntPipe, 
    Post, 
    Put, 
    Req, 
    UseGuards 
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Link } from 'src/entities/link.entity';
import { LinkService } from 'src/services/link.service';

@Controller('links')
export class LinkController {
    constructor(private readonly service: LinkService) {}

    @UseGuards(JwtAuthGuard)
    @Post('')
    create(@Body() body: Link, @Req() req: any) {
        return this.service.create(body, req.user);
    }

    @Get('')
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return `find id`
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: Link) {
        return this.service.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return `delete id`
    }
}