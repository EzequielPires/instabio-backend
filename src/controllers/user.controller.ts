import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { FindUserQueryDto } from 'src/dtos/find-user-query.dto';
import { Role } from 'src/models/role.enum';
import { UserModel } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

interface ResetPasswordRequest {
    token: string,
    password: string,
    repeat_password: string 
}

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

    @Post('forgot-password')
    forgotPassword(@Body() body) {
        return this.service.sendForgotPassword(body.email);
    }

    @Post('reset-password')
    resetPassword(@Body() body: ResetPasswordRequest) {
        return this.service.resetPassword(body.token, body.password, body.repeat_password);
    }

}