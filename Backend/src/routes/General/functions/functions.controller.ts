import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { FunctionsService } from './functions.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/interceptors/auth/authorization.guard';

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

  @Get('adjust')
  @UseInterceptors()
  adjustInventory() {
    return this.functionsService.adjustInventory();
  }

  @Get('update')
  @UseInterceptors()
  update() {
    return this.functionsService.update();
  }
}
