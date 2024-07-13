import { Module, Global, Logger } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service';
import { AbilityFactory } from 'src/auth/ability.factory';
import { AppCacheService } from 'src/cache/cache.service';

@Global()
@Module({
  providers: [PrismaService, Logger, AbilityFactory, AppCacheService],
  exports: [PrismaService, Logger, AbilityFactory, AppCacheService],
})
export class CommonModule {}
