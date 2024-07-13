import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/module/common.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
// import { AuthService } from './auth/auth.service';
import { RolesModule } from './roles/roles.module';
import { MenuModule } from './menu/menu.module';
import { PermissionModule } from './permission/permission.module';
import { AppCacheModule } from './cache/cache.module';
// import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
// import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    CommonModule,
    UserModule,
    AuthModule,
    RolesModule,
    MenuModule,
    PermissionModule,
    AppCacheModule,
    // AppoCacheModule,
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 60000, // 限速
    //     limit: 20,
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // AuthService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AppModule {}
