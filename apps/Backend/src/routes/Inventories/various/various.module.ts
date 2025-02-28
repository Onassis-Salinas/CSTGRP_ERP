import { Module } from '@nestjs/common';
import { VariousService } from './various.service';
import { VariousController } from './various.controller';

@Module({
  controllers: [VariousController],
  providers: [VariousService],
})
export class VariousModule {}
