import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'common/service/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private prismaService: PrismaService,
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
    try {
      await this.prismaService.$transaction(async (tx) => {
        // 测试专用，流程跑通后修改
        createUserDto.password = await argon2.hash(createUserDto.password); // 加密敏感数据
        console.log(
          '🚀 ~ AuthService ~ awaitthis.prismaService.$transaction ~ createUserDto:',
          createUserDto,
        );
        const userData = await tx.user.create({
          //创建用户,后续需添加加密逻辑
          data: createUserDto,
        });

        const roleData = await tx.userRole.create({
          // 分配默认角色
          data: {
            userId: userData.id,
            roleId: 1,
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
}
