import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { ApiTags } from '@nestjs/swagger';
import { ZodPiPe } from 'src/interceptors/validation/validation.pipe';
import { deleteSchema, editSchema, createSchema } from './materials.schema';
import { AuthGuard } from 'src/interceptors/auth/authorization.guard';
import { FileInterceptor, File } from '@nest-lab/fastify-multer';

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
  @UseInterceptors(FileInterceptor('file'))
  register(@Body() body, @UploadedFile() file: File) {
    const validatedBody = new ZodPiPe(createSchema).transform(
      JSON.parse(body.json),
    );

    return this.materialsService.createMaterial(validatedBody, file);
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
