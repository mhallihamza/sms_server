import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUser } from '@app/shared/interfaces/create-user.interface';
import { UpdateUser } from '@app/shared/interfaces/update-user.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_SERVICE') private client: ClientProxy,
      ) {}
    
    async createUser(user: CreateUser): Promise<any>{
        const result =  await lastValueFrom(this.client.send({ cmd: 'createUser' }, user));
        return result
    }

    async updateUser(id:string, updatedData: UpdateUser ): Promise<any>{
        const result =  await lastValueFrom(this.client.send({ cmd: 'updateUser' }, {id,updatedData}));
        return result
    }

    async getAllUsers() : Promise<any>{
        const users =  await lastValueFrom(this.client.send({ cmd: 'getAllUsers' }, true));
        return users
    }
}
