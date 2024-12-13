import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/interceptors/auth/authorization.guard';

@ApiTags('Inventory Stats')
@Controller('inventorystats')
@UseGuards(new AuthGuard('inventory'))
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('stockwarnings')
  materialWarnings() {
    return this.statsService.getMaterialWarnings();
  }

  @Get('outofstock')
  outOfStock() {
    return this.statsService.getOutOfStock();
  }
}
