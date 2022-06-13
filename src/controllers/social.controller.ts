import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Link } from 'src/entities/link.entity';
import { SocialService } from 'src/services/social.service';

@Controller('social')
export class SocialController {
    constructor(private readonly service: SocialService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post('add')
    create(@Body() body: Link, @Req() req: any) {
        return this.service.create(body, req.user);
    }

    @Get('')
    findAll() {
        return 'find all'
    }

    @Get(':id')
    findOne(@Param('id') id) {
        return `find id`
    }

    @Put(':id')
    update(@Param('id') id, @Body() body) {
        return `update id`
    }

    @Delete(':id')
    delete(@Param('id') id) {
        return `delete id`
    }
}