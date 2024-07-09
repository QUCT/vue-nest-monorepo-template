import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}
  async singnIn(email: string, password: string) {
    const { data, err } = await this.userService.findOneByEmail(email);
    if (!err) {
      const { password: correctPwd, name, id } = data;
      const isPwdValidator = await argon2.verify(correctPwd, password);
      if (isPwdValidator) {
        const token = await this.jwt.signAsync({
          username: name,
          sub: id,
        });
        return {
          data: plainToInstance(CreateUserDto, data),
          token,
        };
      }
      throw new HttpException('当前用户密码错误', 401);
    }

    throw new HttpException('当前用户不存在', 400);

    // throw new HttpException('当前用户密码不正确', 401);
  }
  async singnUp(createUserDto: CreateUserDto) {
    const { data, err } = await this.userService.create(createUserDto);
    if (!err) {
      return { data };
    }
    throw new HttpException('服务异常', 400);
  }
}
