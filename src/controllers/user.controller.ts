import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UserModel } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Post('')
    create(@Body() body: UserModel) {
        return this.service.create(body);
    }

    @Get('')
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.service.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UserModel) {
        return this.service.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.service.delete(id);
    }
}