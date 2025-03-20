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
import { PoImpService } from './po-imp.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/interceptors/auth/authorization.guard';
import { ZodPiPe } from 'src/interceptors/validation/validation.pipe';
import {
  exportSchema,
  idSchema,
  IEFilterSchema,
  importSchema,
} from './po-imp.schema';
import { updateExportSchema, updateImportSchema } from './po-imp.schema';

@ApiTags('PO-Imports')
@Controller('po-imp')
@UseGuards(new AuthGuard('poimp'))
export class PoImpController {
  constructor(private readonly poImpService: PoImpService) {}
  @Get('job/comparison/:id')
  getJobComparison(@Param(new ZodPiPe(idSchema)) params) {
    return this.poImpService.getJobComparison(params);
  }

  @Get('')
  getIE(@Query(new ZodPiPe(IEFilterSchema)) params) {
    return this.poImpService.getIE(params);
  }

  @Get(':id')
  getOneIE(@Param(new ZodPiPe(idSchema)) params) {
    return this.poImpService.getOneIE(params);
  }

  @Post('import')
  importMaterials(@Body(new ZodPiPe(importSchema)) body) {
    return this.poImpService.postInput(body);
  }

  @Post('export')
  exportMaterials(@Body(new ZodPiPe(exportSchema)) body) {
    return this.poImpService.postExport(body);
  }

  @Put('import')
  updateImport(@Body(new ZodPiPe(updateImportSchema)) body, @Req() req) {
    return this.poImpService.updateImport(body, req.cookies.token);
  }

  @Put('export')
  updateExport(@Body(new ZodPiPe(updateExportSchema)) body, @Req() req) {
    return this.poImpService.updateExport(body, req.cookies.token);
  }

  @Delete(':id')
  deleteIE(@Param(new ZodPiPe(idSchema)) body, @Req() req) {
    return this.poImpService.deleteIE(body, req.cookies.token);
  }
}
