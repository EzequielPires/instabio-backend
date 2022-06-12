import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { FindUserQueryDto } from 'src/dtos/find-user-query.dto';
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
    findAll(@Query() queryDto: FindUserQueryDto) {
        return this.service.findAll(queryDto);
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