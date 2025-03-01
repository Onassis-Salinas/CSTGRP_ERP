import { Module } from '@nestjs/common';
import { PetitionsService } from './petitions.service';
import { PetitionsController } from './petitions.controller';
import { ContextProvider } from 'src/interceptors/context.provider';

@Module({
  controllers: [PetitionsController],
  providers: [
    PetitionsService,
    ContextProvider,
    {
      provide: 'MODULE',
      useValue: 'inventory',
    },
  ],
})
export class PetitionsModule {}
