import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IAuthUser } from '@app/shared/interfaces/auth.interface';
import { LoginInterface } from '@app/shared/interfaces/login.interface';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_SERVICE') private client: ClientProxy,
      ) {}
    
    async register(user: IAuthUser): Promise<any>{
        const result =  await firstValueFrom(this.client.send({ cmd: 'register' }, user));
        return result
    }

    async login(loginData: LoginInterface): Promise<any>{
        try {
            const result =  await firstValueFrom(this.client.send({ cmd: 'login' }, loginData));
            return result;
        } catch (error) {
            // Custom handling for specific exceptions
                throw new UnauthorizedException('Invalid credentials');
        }
    }
}
