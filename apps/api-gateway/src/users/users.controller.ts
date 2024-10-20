import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto):Promise<string> {
        return this.usersService.createUser(createUserDto)
    }

    @Put(':id')
    async updateUser(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto):Promise<string> {
        return this.usersService.updateUser(id, updateUserDto)
    }

    @Get()
    async getAllUsers(): Promise<any>{
        return this.usersService.getAllUsers()
    }
}
