import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FunctionsService } from './functions.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/interceptors/auth/authorization.guard';
import { File, FileInterceptor } from '@nest-lab/fastify-multer';

@ApiTags('Functions')
@Controller('functions')
@UseGuards(new AuthGuard('users'))
export class FunctionsController {
  constructor(private readonly functionsService: FunctionsService) {}

  @Get('inv')
  importInventory() {
    return this.functionsService.importInventory();
  }

  @Get('checkall')
  @UseInterceptors()
  checkAll() {
    return this.functionsService.checkAll();
  }

  @Get('job')
  @UseInterceptors()
  processAllJobs() {
    return this.functionsService.processAllJobs();
  }

  @Get('imp')
  @UseInterceptors()
  processAllImports() {
    return this.functionsService.processAllImports();
  }

  @Get('all')
  @UseInterceptors()
  doAll() {
    return this.functionsService.doAll();
  }

  @Get('update')
  @UseInterceptors()
  update() {
    return this.functionsService.update();
  }

  @Post('locations')
  @UseInterceptors(FileInterceptor('file'))
  convertImport(@UploadedFile() file: File) {
    return this.functionsService.importLocations(file);
  }

  @Post('adjust')
  @UseInterceptors(FileInterceptor('file'))
  adjustInventory(@UploadedFile() file: File) {
    return this.functionsService.adjustInventory(file);
  }

  @Post('employees')
  @UseInterceptors(FileInterceptor('file'))
  importEmployees(@UploadedFile() file: File) {
    return this.functionsService.importEmployees(file);
  }

  @Post('employees/photos')
  @UseInterceptors(FileInterceptor('file'))
  importEmployeePhotos(@UploadedFile() file: File) {
    return this.functionsService.importEmployeePhotos(file);
  }
}
