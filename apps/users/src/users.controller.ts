import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'createUser' })
  createUser(data:any):Promise<any> {
    return this.usersService.createUser(data)
  }

  @MessagePattern({ cmd: 'findUser' })
  findUser(email:string):Promise<any> {
    return this.usersService.findUser(email)
  }

  @MessagePattern({ cmd: 'getAllUsers' })
  findAllUsers():Promise<any> {
    return this.usersService.findAllUsers()
  }
}
