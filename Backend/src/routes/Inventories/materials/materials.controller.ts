import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { ApiTags } from '@nestjs/swagger';
import { ZodPiPe } from 'src/interceptors/validation/validation.pipe';
import { deleteSchema, editSchema, createSchema } from './materials.schema';
import { AuthGuard } from 'src/interceptors/auth/authorization.guard';

@ApiTags('Materials')
@Controller('materials')
@UseGuards(new AuthGuard('materials'))
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get()
  get() {
    return this.materialsService.findAllMaterials();
  }

  @Post()
  register(@Body(new ZodPiPe(createSchema)) body) {
    return this.materialsService.createMaterial(body);
  }

  @Put()
  edit(@Body(new ZodPiPe(editSchema)) body) {
    return this.materialsService.editMaterial(body);
  }

  @Delete()
  delete(@Body(new ZodPiPe(deleteSchema)) body) {
    return this.materialsService.deleteMaterial(body);
  }
}
