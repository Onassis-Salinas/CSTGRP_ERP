import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { MaterialsModule } from './materials/materials.module';
import { VariousModule } from './various/various.module';
import { MovementsModule } from './movements/movements.module';
import { StatsModule } from './stats/stats.module';
import { ClientMovementsModule } from './clients/movements/movements.module';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [
    InventoryModule,
    MaterialsModule,
    VariousModule,
    MovementsModule,
    StatsModule,
    RecordsModule,
    ClientMovementsModule,
  ],
})
export class InventoriesModule {}
