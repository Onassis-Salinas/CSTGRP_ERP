import { Module } from '@nestjs/common';
import { AssistanceController } from './assistance.controller';
import { AssistanceService } from './assistance.service';
import { ContextProvider } from 'src/interceptors/context.provider';

@Module({
  controllers: [AssistanceController],
  providers: [
    AssistanceService,
    ContextProvider,
    {
      provide: 'MODULE',
      useValue: 'hr',
    },
  ],
})
export class AssistanceModule {}
