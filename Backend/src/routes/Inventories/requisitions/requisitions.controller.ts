import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RequisitionsService } from './requsitions.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/interceptors/auth/authorization.guard';
import { ZodPiPe } from 'src/interceptors/validation/validation.pipe';
import {
  idSchema,
  jobsSchema,
  movementsFilterSchema,
  requisitionSchema,
} from './requsitions.schema';

@ApiTags('Material Requisitions')
@Controller('requisitions')
@UseGuards(new AuthGuard('requisitions'))
export class RequisitionsController {
  constructor(private readonly requisitionsService: RequisitionsService) {}

  @Get('movements')
  getMovements(@Query(new ZodPiPe(movementsFilterSchema)) params) {
    return this.requisitionsService.getMovements(params);
  }

  @Get('jobs')
  getPendingJobs(@Query(new ZodPiPe(jobsSchema)) params) {
    return this.requisitionsService.getPendingJobs(params);
  }

  @Post()
  createRequisition(@Body(new ZodPiPe(requisitionSchema)) body) {
    return this.requisitionsService.createRequisition(body);
  }

  @Delete()
  delete(@Body(new ZodPiPe(idSchema)) body) {
    return this.requisitionsService.deleteRequisition(body);
  }

  @Get('export-pending')
  exportPending() {
    return this.requisitionsService.exportPending();
  }
}
