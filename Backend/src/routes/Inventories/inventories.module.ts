import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { MaterialsModule } from './materials/materials.module';
import { VariousModule } from './various/various.module';
import { MovementsModule } from './movements/movements.module';
import { StatsModule } from './stats/stats.module';
import { ClientMovementsModule } from './clients/movements/movements.module';
import { RequisitionsModule } from './requisitions/requsitions.module';

@Module({
  imports: [
    InventoryModule,
    MaterialsModule,
    VariousModule,
    MovementsModule,
    StatsModule,
    ClientMovementsModule,
    RequisitionsModule,
  ],
})
export class InventoriesModule {}
