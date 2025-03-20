import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MovementsService } from './movements.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/interceptors/auth/authorization.guard';
import { ZodPiPe } from 'src/interceptors/validation/validation.pipe';
import {
  idSchema,
  movementsFilterSchema,
  repositionSchema,
  returnSchema,
  scrapSchema,
  suppliesSchema,
  updateAmountSchema,
} from './movements.schema';

@ApiTags('Material Movements')
@Controller('materialmovements')
@UseGuards(new AuthGuard('materialmovements'))
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Get()
  getMovements(@Query(new ZodPiPe(movementsFilterSchema)) params) {
    return this.movementsService.getMovements(params);
  }

  @Get('export-pending')
  exportPending() {
    return this.movementsService.exportPending();
  }

  @Post('scrap')
  postScrap(@Body(new ZodPiPe(scrapSchema)) body) {
    return this.movementsService.postScrap(body);
  }

  @Post('supplies')
  postSupplies(@Body(new ZodPiPe(suppliesSchema)) body) {
    return this.movementsService.postSupplies(body);
  }

  @Post('reposition')
  postReposition(@Body(new ZodPiPe(repositionSchema)) body) {
    return this.movementsService.postReposition(body);
  }

  @Post('return')
  postReturn(@Body(new ZodPiPe(returnSchema)) body) {
    return this.movementsService.postReturn(body);
  }

  @Put('activate')
  activateMovement(@Body(new ZodPiPe(idSchema)) body) {
    return this.movementsService.activateMovement(body);
  }

  @Put('realamount')
  udpateRealAmount(@Body(new ZodPiPe(updateAmountSchema)) body) {
    return this.movementsService.updateRealAmount(body);
  }
}
