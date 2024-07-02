import { Module } from '@nestjs/common';
import { AreasModule } from './areas/areas.module';
import { PositionsModule } from './positions/positions.module';

@Module({
  imports: [AreasModule, PositionsModule],
})
export class StructureModule {}
