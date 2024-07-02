import {
  Controller,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Get,
  Query,
} from '@nestjs/common';
import { VariousService } from './various.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/interceptors/auth/authorization.guard';
import { FileInterceptor, File } from '@nest-lab/fastify-multer';

@ApiTags('Inventory various')
@Controller('inventoryvarious')
@UseGuards(new AuthGuard('inventory'))
export class VariousController {
  constructor(private readonly variousService: VariousService) {}

  @Get('measurement')
  getMeasurement(@Query() query) {
    return this.variousService.getMeasurement(query);
  }

  @Get('clients')
  getClients() {
    return this.variousService.getClients();
  }

  @Post('exportxlsx')
  @UseInterceptors(FileInterceptor('file'))
  convertExcel(@UploadedFile() file: File) {
    return this.variousService.convertExcel(file);
  }

  @Post('jobpdf')
  @UseInterceptors(FileInterceptor('file'))
  convertJob(@UploadedFile() file: File) {
    return this.variousService.convertJobPdf(file);
  }

  @Post('importpdf')
  @UseInterceptors(FileInterceptor('file'))
  convertImport(@UploadedFile() file: File) {
    return this.variousService.ConvertImportPdf(file);
  }
}
