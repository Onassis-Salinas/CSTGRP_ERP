import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PetitionsService } from './petitions.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/interceptors/auth/authorization.guard';
import { ZodPiPe } from 'src/interceptors/validation/validation.pipe';
import { idSchema, filterSchema } from './petitions.schema';

@ApiTags('Material Petitions')
@Controller('petitions')
@UseGuards(new AuthGuard('petitions'))
export class PetitionsController {
  constructor(private readonly petitionsService: PetitionsService) {}

  @Get('')
  getPetitions(@Query(new ZodPiPe(filterSchema)) params) {
    return this.petitionsService.getPetitions(params);
  }

  @Get('/download/:id')
  download(@Param(new ZodPiPe(idSchema)) params) {
    return this.petitionsService.download(params);
  }

  @Delete(':id')
  delete(@Param(new ZodPiPe(idSchema)) body) {
    return this.petitionsService.deleteRequisition(body);
  }
}
