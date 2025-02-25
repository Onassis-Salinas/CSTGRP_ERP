import { Module } from '@nestjs/common';
import { ComputersService } from './computers.service';
import { ComputersController } from './computers.controller';

@Module({
  controllers: [ComputersController],
  providers: [ComputersService],
})
export class ComputersModule {}
