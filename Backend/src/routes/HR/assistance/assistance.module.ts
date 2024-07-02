import { Module } from '@nestjs/common';
import { AssistanceController } from './assistance.controller';
import { AssistanceService } from './assistance.service';

@Module({
  controllers: [AssistanceController],
  providers: [AssistanceService],
})
export class AssistanceModule {}
