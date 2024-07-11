import { Module } from '@nestjs/common';
import { TtService } from './tt.service';
import { TtController } from './tt.controller';

@Module({
  controllers: [TtController],
  providers: [TtService],
})
export class TtModule {}
