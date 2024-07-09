import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from 'src/auth/dto/signin-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { FormatInterceptor } from 'interpector/response-format.interceptor';
import { SignUpDto } from './dto/signuo-dto';

@Controller('auth')
@UseInterceptors(FormatInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async signin(@Body() signInAuthDto: SignInAuthDto) {
    const { email, password } = signInAuthDto;
    const data = await this.authService.singnIn(email, password);
    return data;
  }

  @Post('/signup')
  async signup(@Body() signUpDto: SignUpDto) {
    const res = await this.authService.singnUp(signUpDto);
    return res;
  }
}
