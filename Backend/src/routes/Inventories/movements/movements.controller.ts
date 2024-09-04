import {
  Body,
  Controller,
  Get,
  Param,
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
  exportSchema,
  idSchema,
  importSchema,
  movementsFilterSchema,
  updateAmountSchema,
} from './movements.schema';

@ApiTags('Material Movements')
@Controller('materialmovements')
@UseGuards(new AuthGuard('inventory'))
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}
  @Get('material/:id')
  getMaterialMovements(@Param(new ZodPiPe(idSchema)) params) {
    return this.movementsService.getMaterialMovements(params);
  }

  @Get()
  getjobMovements(@Query(new ZodPiPe(movementsFilterSchema)) params) {
    return this.movementsService.getJobMovements(params);
  }

  @Post('import')
  importMaterials(@Body(new ZodPiPe(importSchema)) body) {
    return this.movementsService.postInput(body);
  }

  @Post('export')
  exportMaterials(@Body(new ZodPiPe(exportSchema)) body) {
    return this.movementsService.postExport(body);
  }

  @Put('activate')
  activateMovement(@Body(new ZodPiPe(idSchema)) body) {
    return this.movementsService.activateMovement(body);
  }

  // @Put('realamount')
  // udpateRealAmount(@Body(new ZodPiPe(updateAmountSchema)) body) {
  //   return this.movementsService.updateRealAmount(body);
  // }
}
