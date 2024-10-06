import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto):Promise<string> {
        return this.authService.register(registerUserDto)
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto):Promise<string> {
        return this.authService.login(loginDto)
    }
}
