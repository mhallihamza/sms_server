import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IUser } from '@app/shared/interfaces/user.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_SERVICE') private client: ClientProxy,
      ) {}
    
    async createUser(user: IUser): Promise<any>{
        const result =  await lastValueFrom(this.client.send({ cmd: 'createUser' }, user));
        return result
    }

    async updateUser(): Promise<any>{
        //const result =  await firstValueFrom(this.client.send({ cmd: 'login' }, loginData));
        return "result"
    }

    async getAllUsers() : Promise<any>{
        const users =  await lastValueFrom(this.client.send({ cmd: 'getAllUsers' }, true));
        return users
    }
}
