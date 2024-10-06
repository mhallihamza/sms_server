import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'register' })
  register(data:any):Promise<any> {
    return this.authService.register(data)
  }

  @MessagePattern({ cmd: 'login' })
  login(data:any):Promise<any> {
    return this.authService.login(data)
  }
}
