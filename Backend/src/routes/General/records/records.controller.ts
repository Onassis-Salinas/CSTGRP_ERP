import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RecordsService } from './records.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/interceptors/auth/authorization.guard';
import { ZodPiPe } from 'src/interceptors/validation/validation.pipe';
import { filtersSchema } from './records.schema';

@ApiTags('Inventory Records')
@Controller('inventory-records')
@UseGuards(new AuthGuard('users'))
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get()
  getMaterialMovements(@Query(new ZodPiPe(filtersSchema)) query) {
    return this.recordsService.getRecords(query);
  }
}
