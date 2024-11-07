import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUser } from '@app/shared/interfaces/create-user.interface';
import { UpdateUser } from '@app/shared/interfaces/update-user.interface';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  private readonly saltRounds = 10; // Number of salt rounds
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user:CreateUser):Promise<any> {
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

  async updateUser({id, updatedData}:{id:string, updatedData: UpdateUser | any}):Promise<any> {
    console.log(id, updatedData);
    const salt = await bcrypt.genSalt(this.saltRounds);
    const user = await this.userRepository.findOneBy({userId: id})
    if(updatedData.password) {
      if (await bcrypt.compare(updatedData.currentPassword, user.password)) {
        console.log("yes")
        const hash = await bcrypt.hash(updatedData.password, salt);
        const result = await this.userRepository.save({...user, password: hash})
        return result
    }
    else {
      return false
    }
    }
    else {
    const result = await this.userRepository.save({...user, ...updatedData})
    return result
    }
  }
}
