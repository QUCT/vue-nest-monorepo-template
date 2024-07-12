import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
const prisma = new PrismaClient();

// 此操作会清空数据库 并初始化默认数据 谨慎使用
async function main() {
  await prisma.role.createMany({
    data: [
      {
        id: 1,
        name: '超级管理员',
        roleCode: 'SUPER_ADMIN',
        status: 'ACTIVE',
        description: '超级管理员',
        isSystem: true,
      },
      {
        id: 2,
        name: '管理员',
        roleCode: 'ADMIN',
        status: 'ACTIVE',
        description: '管理员',
        isSystem: true,
      },
      {
        id: 3,
        name: '普通用户',
        roleCode: 'USER',
        status: 'ACTIVE',
        description: '用户',
        isSystem: true,
      },
    ],
  });

  const pwd = await argon2.hash('123456');
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        name: 'admin',
        email: 'admin@mail.com',
        password: pwd,
      },
    ],
  });
  await prisma.userRole.createMany({
    data: [
      {
        id: 1,
        userId: 1,
        roleId: 2,
      },
    ],
  });

  await prisma.permission.createMany({
    data: [
      {
        id: 1,
        name: 'menu',
        ruleCode: 'ALL',
        menuId: 1,
        status: 'ACTIVE',
        isSystem: true,
      },
      {
        id: 2,
        name: 'user',
        ruleCode: 'ALL',
        menuId: 2,
        status: 'ACTIVE',
        isSystem: true,
      },
    ],
  });

  await prisma.rolePermission.createMany({
    data: [
      {
        id: 1,
        roleId: 2,
        permissionId: 1,
      },
      {
        id: 2,
        roleId: 2,
        permissionId: 2,
      },
    ],
  });

  await prisma.menu.createMany({
    data: [
      {
        id: 1,
        name: 'menu',
        path: '/com/menu',
        order: 1,
        status: 'ACTIVE',
        isSystem: true,
      },
      {
        id: 2,
        name: 'user',
        path: '/com/user',
        order: 2,
        status: 'ACTIVE',
        isSystem: true,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
