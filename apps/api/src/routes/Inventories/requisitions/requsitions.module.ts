import { Module } from '@nestjs/common';
import { RequisitionsService } from './requsitions.service';
import { RequisitionsController } from './requisitions.controller';
import { ContextProvider } from 'src/interceptors/context.provider';

@Module({
  controllers: [RequisitionsController],
  providers: [
    RequisitionsService,
    ContextProvider,
    {
      provide: 'MODULE',
      useValue: 'inventory',
    },
  ],
})
export class RequisitionsModule {}
