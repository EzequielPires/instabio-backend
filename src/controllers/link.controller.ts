import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    ParseIntPipe, 
    Patch, 
    Post, 
    Put, 
    Query, 
    Req, 
    UseGuards 
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FindLinksQueryDto } from 'src/dtos/find-links-query.dto';
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
    findAll(@Query() queryDto: FindLinksQueryDto) {
        return this.service.findAll(queryDto);
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
        return this.service.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('state/:id')
    toggleState(@Param('id', ParseIntPipe) id: number, @Body() body: Link, @Req() req: any) {
        return this.service.toggleState(id, body.state, req.user);
    }
}