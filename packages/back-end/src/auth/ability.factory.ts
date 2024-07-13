// ability.factory.ts
import { Injectable } from '@nestjs/common';

import { AbilityBuilder, PureAbility } from '@casl/ability';
import { PrismaService } from '../common/service/prisma.service';
import { createPrismaAbility, PrismaQuery } from '@casl/prisma';
import { flatten } from 'lodash';

type AppAbility = PureAbility<[string, string], PrismaQuery>;

const ruleCodeMap = {
  VIEW: ['GET'],
  EDIT: ['GET', 'POST', 'PATCH', 'DELETE'],
  ALL: ['DELETE', 'GET', 'POST', 'PATCH'],
};

@Injectable()
export class AbilityFactory {
  constructor(private prisma: PrismaService) {}

  async defineAbility(userId: number, action: string): Promise<AppAbility> {
    const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

    const userRoles = await this.prisma.userRole.findMany({
      where: { userId: userId },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: { permission: { include: { menu: true } } },
            },
          },
        },
      },
    });
    const roleCodeArr = userRoles.map((ele) => ele.role.roleCode);
    const permissionArr = userRoles.map((ele) => {
      return ele.role.rolePermissions.map((ele) => ele.permission);
    });
    const menuArr = permissionArr.flatMap((ele) =>
      ele.map((ele1) => ({
        ...ele1.menu,
        ruleCode: ele1.ruleCode,
        permissionName: ele1.name,
        menuId: ele1.menuId,
      })),
    );

    if (roleCodeArr.includes('SUPER_ADMIN')) {
      can('manage', 'all');
    } else if (roleCodeArr.includes('ADMIN')) {
      can(action, 'all');
    } else if (roleCodeArr.includes('USER')) {
      const flattenMenuArr = flatten(menuArr);

      flattenMenuArr.forEach((ele) => {
        const { name, ruleCode } = ele;
        const rules = ruleCodeMap[ruleCode];
        rules.forEach((ruleItem) => {
          can(name, ruleItem);
        });
      });
    } else {
      can(action, 'GET');
    }

    return build();
  }
}
