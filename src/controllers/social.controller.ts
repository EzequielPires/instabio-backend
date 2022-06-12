import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('')
export class SocialController {
    constructor() {}

    @Post('')
    create(@Body() body) {
        return 'create'
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