import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IUser } from '@app/shared/interfaces/user.interface';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user:IUser):Promise<any> {
    const res = await this.userRepository.save(user);
    console.log(res);
    return `created successfully`
  }

  async findUser(email:string):Promise<any> {
    const user = await this.userRepository.findOneBy({email})
    console.log(user);
    return user
  }

  async findAllUsers():Promise<any> {
    const users = await this.userRepository.find()
    return users
  }
}
