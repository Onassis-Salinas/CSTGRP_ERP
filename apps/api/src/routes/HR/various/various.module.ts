import { Module } from '@nestjs/common';
import { VariousController } from './various.controller';
import { VariousService } from './various.service';

@Module({
  controllers: [VariousController],
  providers: [VariousService],
})
export class VariousModule {}
