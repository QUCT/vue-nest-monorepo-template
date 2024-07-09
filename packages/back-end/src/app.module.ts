import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '../common/module/common.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { RolesModule } from './roles/roles.module';
import { OperationModule } from './operation/operation.module';

@Module({
  imports: [CommonModule, UserModule, AuthModule, RolesModule, OperationModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
