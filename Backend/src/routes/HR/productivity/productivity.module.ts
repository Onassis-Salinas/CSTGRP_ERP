import { Module } from '@nestjs/common';
import { ProductivityController } from './productivity.controller';
import { ProductivityService } from './productivity.service';
import { ContextProvider } from 'src/interceptors/context.provider';

@Module({
  controllers: [ProductivityController],
  providers: [
    ProductivityService,
    ContextProvider,
    {
      provide: 'MODULE',
      useValue: 'hr',
    },
  ],
})
export class ProductivityModule {}
