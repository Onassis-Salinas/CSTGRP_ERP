import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { ApiTags } from '@nestjs/swagger';
import { ZodPiPe } from 'src/interceptors/validation/validation.pipe';
import { clientSchema, idSchema } from './movements.schema';

@ApiTags('Clients')
@Controller('clients')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Get('material/comparison/:id')
  getMaterialComparison(
    @Param(new ZodPiPe(idSchema)) params,
    @Req() req,
    @Query(new ZodPiPe(clientSchema)) query,
  ) {
    return this.movementsService.getMaterialComparison(
      params,
      req.cookies.token,
      query,
    );
  }

  @Get()
  get(@Req() req, @Query(new ZodPiPe(clientSchema)) query) {
    return this.movementsService.getInventory(req.cookies.token, query);
  }

  @Get('clients')
  getClients() {
    return this.movementsService.getClients();
  }
}
