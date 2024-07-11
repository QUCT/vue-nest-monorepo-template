import { Module, Global, Logger } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service';
import { AbilityFactory } from 'src/auth/ability.factory';

@Global()
@Module({
  providers: [PrismaService, Logger, AbilityFactory],
  exports: [PrismaService, Logger, AbilityFactory],
})
export class CommonModule {}
