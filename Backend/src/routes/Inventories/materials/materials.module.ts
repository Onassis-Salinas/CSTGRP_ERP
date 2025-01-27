import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { ContextProvider } from 'src/interceptors/context.provider';

@Module({
  controllers: [MaterialsController],
  providers: [
    MaterialsService,
    ContextProvider,
    {
      provide: 'MODULE',
      useValue: 'inventory',
    },
  ],
})
export class MaterialsModule {}
