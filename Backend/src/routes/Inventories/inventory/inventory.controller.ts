import { Controller, Get, Header, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/interceptors/auth/authorization.guard';

@ApiTags('Inventory')
@Controller('inventory')
@UseGuards(new AuthGuard('inventory'))
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  get() {
    return this.inventoryService.getInventory();
  }

  @Get('export')
  @Header('Content-Disposition', 'attachment; filename=Inventario.xlsx')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  export() {
    return this.inventoryService.export();
  }
}
