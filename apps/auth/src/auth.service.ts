import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { lastValueFrom } from 'rxjs';
import { AuthUser } from './auth-user.entity'; // Register User Entity
import { IAuthUser } from '@app/shared/interfaces/auth.interface'; // Register User Interface
import { LoginInterface } from '@app/shared/interfaces/login.interface';
import { ClientProxy } from '@nestjs/microservices';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10; // Number of salt rounds

  constructor(
    @InjectRepository(AuthUser)
    private readonly userRepository: Repository<AuthUser>,
    @Inject('USER_SERVICE') private client: ClientProxy,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await lastValueFrom(this.client.send({ cmd: 'findUser' }, email));
    if (user && await bcrypt.compare(password, user.password)) {
        return user;
    }
    return null;
  }

  async register(data:IAuthUser):Promise<any> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const user = new AuthUser();
    const { email, password, firstName, lastName, phoneNumber } = data;
    const hash = await bcrypt.hash(password, salt);
    user.email = email;
    user.password = hash;
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    const res = await this.userRepository.save(user)
    await lastValueFrom(this.client.send({ cmd: 'createUser' }, user))
    console.log(res)
    return `created successfully`
  }

  async login(data: LoginInterface):Promise<any> {
    const { email, password } = data;
      const user = await this.validateUser(email, password);
      if(!user){
      throw new UnauthorizedException('Invalid credentials');
      }
    return user
  }
}