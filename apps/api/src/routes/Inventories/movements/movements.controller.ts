import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MovementsService } from './movements.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/interceptors/auth/authorization.guard';
import { ZodPiPe } from 'src/interceptors/validation/validation.pipe';
import {
  exportSchema,
  idSchema,
  IEFilterSchema,
  importSchema,
  movementsFilterSchema,
  repositionSchema,
  returnSchema,
  scrapSchema,
  suppliesSchema,
  updateAmountSchema,
  updateExportSchema,
  updateImportSchema,
} from './movements.schema';

@ApiTags('Material Movements')
@Controller('materialmovements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}
  @UseGuards(new AuthGuard('poimp'))
  @Get('job/comparison/:id')
  getJobComparison(@Param(new ZodPiPe(idSchema)) params) {
    return this.movementsService.getJobComparison(params);
  }

  @UseGuards(new AuthGuard('materialmovements'))
  @Get()
  getMovements(@Query(new ZodPiPe(movementsFilterSchema)) params) {
    return this.movementsService.getMovements(params);
  }

  @UseGuards(new AuthGuard('materialmovements'))
  @Get('export-pending')
  exportPending() {
    return this.movementsService.exportPending();
  }

  @UseGuards(new AuthGuard('poimp'))
  @Get('ie')
  getIE(@Query(new ZodPiPe(IEFilterSchema)) params) {
    return this.movementsService.getIE(params);
  }

  @UseGuards(new AuthGuard('poimp'))
  @Get('ie/:id')
  getOneIE(@Param(new ZodPiPe(idSchema)) params) {
    return this.movementsService.getOneIE(params);
  }

  @UseGuards(new AuthGuard('poimp'))
  @Post('import')
  importMaterials(@Body(new ZodPiPe(importSchema)) body) {
    return this.movementsService.postInput(body);
  }

  @UseGuards(new AuthGuard('poimp'))
  @Post('export')
  exportMaterials(@Body(new ZodPiPe(exportSchema)) body) {
    return this.movementsService.postExport(body);
  }

  @UseGuards(new AuthGuard('materialmovements'))
  @Post('scrap')
  postScrap(@Body(new ZodPiPe(scrapSchema)) body) {
    return this.movementsService.postScrap(body);
  }

  @UseGuards(new AuthGuard('materialmovements'))
  @Post('supplies')
  postSupplies(@Body(new ZodPiPe(suppliesSchema)) body) {
    return this.movementsService.postSupplies(body);
  }

  @UseGuards(new AuthGuard('materialmovements'))
  @Post('reposition')
  postReposition(@Body(new ZodPiPe(repositionSchema)) body) {
    return this.movementsService.postReposition(body);
  }

  @UseGuards(new AuthGuard('materialmovements'))
  @Post('return')
  postReturn(@Body(new ZodPiPe(returnSchema)) body) {
    return this.movementsService.postReturn(body);
  }

  @UseGuards(new AuthGuard('materialmovements'))
  @Put('activate')
  activateMovement(@Body(new ZodPiPe(idSchema)) body) {
    return this.movementsService.activateMovement(body);
  }

  @UseGuards(new AuthGuard('materialmovements'))
  @Put('import')
  updateImport(@Body(new ZodPiPe(updateImportSchema)) body, @Req() req) {
    return this.movementsService.updateImport(body, req.cookies.token);
  }

  @UseGuards(new AuthGuard('materialmovements'))
  @Put('export')
  updateExport(@Body(new ZodPiPe(updateExportSchema)) body, @Req() req) {
    return this.movementsService.updateExport(body, req.cookies.token);
  }

  @UseGuards(new AuthGuard('materialmovements'))
  @Put('realamount')
  udpateRealAmount(@Body(new ZodPiPe(updateAmountSchema)) body) {
    return this.movementsService.updateRealAmount(body);
  }

  @UseGuards(new AuthGuard('poimp'))
  @Delete('ie/:id')
  deleteIE(@Param(new ZodPiPe(idSchema)) body, @Req() req) {
    return this.movementsService.deleteIE(body, req.cookies.token);
  }
}
