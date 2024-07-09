import { Module, Global, Logger } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service';

@Global()
@Module({
  providers: [PrismaService, Logger],
  exports: [PrismaService, Logger],
})
export class CommonModule {}
