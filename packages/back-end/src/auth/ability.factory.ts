// ability.factory.ts
import { Injectable } from '@nestjs/common';

import { AbilityBuilder, PureAbility } from '@casl/ability';
import { PrismaService } from 'common/service/prisma.service';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';
import * as _ from 'lodash';
import { permission } from 'process';

// type Actions = 'access';
// type AppAbility = Ability<[Actions, string]>;

type AppAbility = PureAbility<[string, string], PrismaQuery>;

const ruleCodeMap = {
  VIEW: ['GET'],
  EDIT: ['GET', 'POST', 'PATCH'],
  ALL: ['DELETE', 'GET', 'POST', 'PATCH'],
};

@Injectable()
export class AbilityFactory {
  constructor(private prisma: PrismaService) {}

  async defineAbility(userId: number, action: string): Promise<AppAbility> {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );

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
    const menuArr = permissionArr.map((ele) => {
      return ele.map((ele1) => {
        const menuData = {
          ...ele1.menu,
          ruleCode: ele1.ruleCode,
          permissionName: ele1.name,
          menuId: ele1.menuId,
        };
        return menuData;
      });
    });

    if (roleCodeArr.includes('SUPER_ADMIN')) {
      can('manage', 'all');
    } else if (roleCodeArr.includes('ADMIN')) {
      can(action, 'all');
    } else if (roleCodeArr.includes('USER')) {
      const flattenMenuArr = _.flatten(menuArr);

      flattenMenuArr.forEach((ele) => {
        const { name, ruleCode } = ele;
        console.log(
          '🚀 ~ AbilityFactory ~ flattenMenuArr.forEach ~ name:',
          name,
          ruleCode,
        );
        switch (ruleCode) {
          case 'VIEW':
            can(name, 'GET');
            break;
          case 'EDIT':
            can(name, 'GET');
            can(name, 'POST');
            can(name, 'DELETE');
            can(name, 'PATCH');
          case 'ALL':
            can(name, 'all');
          default:
            break;
        }
      });
    } else {
      can(action, 'GET');
    }

    return build();
  }
}
