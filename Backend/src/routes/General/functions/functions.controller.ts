import {
  Controller,
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

  @Post('importinventory')
  @UseInterceptors(FileInterceptor('file'))
  importInventory(@UploadedFile() file: File) {
    return this.functionsService.importInventory(file);
  }

  // @Get('checkall')
  // @UseInterceptors()
  // checkAll() {
  //   return this.functionsService.checkAll();
  // }
}
