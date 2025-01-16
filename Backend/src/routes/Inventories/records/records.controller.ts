import { Controller, Get, UseGuards } from '@nestjs/common';
import { RecordsService } from './records.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/interceptors/auth/authorization.guard';

@ApiTags('Inventory Records')
@Controller('inventory-records')
@UseGuards(new AuthGuard('users'))
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}
  @Get()
  getRecords() {
    return this.recordsService.getRecords();
  }
}
