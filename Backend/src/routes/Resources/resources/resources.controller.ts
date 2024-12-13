import { Controller, Get, Param } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get('formatsfolders')
  getFolders() {
    return this.resourcesService.getFolders();
  }

  @Get('formatslist/:folder')
  getFormats(@Param() params) {
    return this.resourcesService.getFormats(params);
  }

  @Get('directory')
  getDirectory() {
    return this.resourcesService.getDirectory();
  }
}
