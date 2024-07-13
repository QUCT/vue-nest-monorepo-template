import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../common/service/prisma.service';
import { FastifyRequest } from 'fastify/types/request';
import { AbilityFactory } from 'src/auth/ability.factory';

type User = {
  userId: number; // 或者具体指定类型
  username: string;
};

type UserData = {
  user: User;
};
@Injectable()
export class InterfaceRulesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
    private prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 此守卫负责控制权限，判断用户是否拥有访问某路由的权限
    const request = context
      .switchToHttp()
      .getRequest<FastifyRequest & UserData>();
    const { user, method } = request;

    // 获取当前请求的信息
    const controller = context.getClass();
    const prefix = this.reflector.get<string>('controllerPrefix', controller);

    const subject = method;
    // 定义权限
    const ability = await this.abilityFactory.defineAbility(
      user.userId,
      prefix,
    );

    // 检查权限
    const flag = ability.can(prefix, subject);

    return flag;
  }
}
