import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '../common/module/common.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { RolesModule } from './roles/roles.module';
import { MenuModule } from './menu/menu.module';
import { PermissionModule } from './permission/permission.module';
import { TtModule } from './tt/tt.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    AuthModule,
    RolesModule,
    MenuModule,
    PermissionModule,
    TtModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
