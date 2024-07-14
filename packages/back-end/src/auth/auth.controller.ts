import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from 'src/auth/dto/signin-auth.dto';
import { SignUpDto } from './dto/signup-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async signin(@Body() signInAuthDto: SignInAuthDto) {
    const data = await this.authService.singnIn(signInAuthDto);
    return data;
  }

  @Post('/signup')
  async signup(@Body() signUpDto: SignUpDto) {
    const { data, err } = await this.authService.singnUp(signUpDto);
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }
  @Get('/imgCode')
  async imgCode() {
    const { data, err } = await this.authService.createImgCode();
    if (!err) {
      return { data };
    }
    throw new HttpException(err, 400);
  }
}
