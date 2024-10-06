import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto):Promise<string> {
        return this.usersService.createUser(createUserDto)
    }

    @Post()
    async updateUser():Promise<string> {
        return this.usersService.updateUser()
    }

    @Get()
    async getAllUsers(): Promise<any>{
        return this.usersService.getAllUsers()
    }
}
