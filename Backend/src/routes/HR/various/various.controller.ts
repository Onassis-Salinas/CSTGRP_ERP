import { Controller, Get, Query } from '@nestjs/common';
import { VariousService } from './various.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HR Various')
@Controller('hrvarious')
export class VariousController {
  constructor(private readonly employeesService: VariousService) {}

  @Get('areas')
  getAreas() {
    return this.employeesService.getAreas();
  }

  @Get('positions')
  getPositions() {
    return this.employeesService.getPositions();
  }

  @Get('incidences')
  getIncidences() {
    return this.employeesService.getIncidences();
  }

  @Get('birthdayphoto')
  getBorthdayPhoto(@Query() query) {
    return this.employeesService.generateImage(query);
  }
}
