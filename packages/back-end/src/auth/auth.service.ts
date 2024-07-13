import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../common/service/prisma.service';
import { QueryAuthVo } from './vo/query-auth.vo';
import { AppCacheService } from 'src/cache/cache.service';
import * as argon2 from 'argon2';
import * as svgCaptcha from 'svg-captcha';
import * as crypto from 'crypto';
import { SignInAuthDto } from './dto/signin-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private prismaService: PrismaService,
    private appCacheService: AppCacheService,
  ) {
    svgCaptcha.options.height = 40;
  }
  async singnIn(signInAuthDto: SignInAuthDto) {
    const { name, code, captchaKey, password } = signInAuthDto;
    const { data, err } = await this.userService.findOneByName(name);
    if (!err) {
      const { password: correctPwd, name, id } = data;
      const isPwdValidator = await argon2.verify(correctPwd, password);
      if (isPwdValidator) {
        const corrextCaptcha = await this.appCacheService.cacheGet(captchaKey);
        if (!corrextCaptcha) {
          throw new HttpException('验证码已过期', 400);
        }
        if (code.toLowerCase() !== corrextCaptcha?.toLowerCase()) {
          throw new HttpException('验证码错误', 400);
        }
        const token = await this.jwt.signAsync({
          username: name,
          sub: id,
        });
        return {
          data: plainToInstance(QueryAuthVo, data),
          token,
        };
      }
      throw new HttpException('当前用户账号/密码错误', 400);
    }

    throw new HttpException('当前用户不存在', 400);
  }
  async singnUp(createUserDto: CreateUserDto) {
    try {
      await this.prismaService.$transaction(async (tx) => {
        createUserDto.password = await argon2.hash(createUserDto.password); // 加密敏感数据
        const userData = await tx.user.create({
          data: createUserDto,
        });

        const roleData = await tx.userRole.create({
          // 分配默认角色
          data: {
            userId: userData.id,
            roleId: 2, // 默认管理员
          },
        });
        await tx.rolePermission.create({
          // 分配默认权限
          data: {
            roleId: roleData.id,
            permissionId: 1,
          },
        });
      });
      return {
        data: [],
        err: null,
      };
    } catch (error) {
      return {
        data: null,
        err: error,
      };
    }
  }

  async createImgCode() {
    try {
      const captcha = svgCaptcha.create();
      const randomKey = crypto.randomBytes(16).toString('hex');
      await this.appCacheService.cacheSet(randomKey, captcha.text);
      return {
        data: {
          img: captcha.data,
          captchaKey: randomKey,
        },
        err: null,
      };
    } catch (error) {
      return {
        data: null,
        err: error,
      };
    }
  }
}
