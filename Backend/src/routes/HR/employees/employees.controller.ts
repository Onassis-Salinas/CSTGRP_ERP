import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Put,
  Header,
  Param,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/interceptors/auth/authorization.guard';
import { ZodPiPe } from 'src/interceptors/validation/validation.pipe';
import {
  createSchema,
  editSchema,
  idSchema,
  quitSchema,
  reactivateSchema,
  templateSchema,
} from './employees.schema';

@ApiTags('Employees')
@Controller('employees')
@UseGuards(new AuthGuard('employees'))
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  getActive() {
    return this.employeesService.getActiveEmployees();
  }

  @Get('assistance/:id')
  getAssistance(@Param(new ZodPiPe(idSchema)) params) {
    return this.employeesService.getAssistance(params);
  }

  @Get('productivity/:id')
  getProductivity(@Param(new ZodPiPe(idSchema)) params) {
    return this.employeesService.getProductivity(params);
  }

  @Get('inactive')
  getInactive() {
    return this.employeesService.getInactiveEmployees();
  }

  @Post()
  create(@Body(new ZodPiPe(createSchema)) body) {
    return this.employeesService.registerEmployee(body);
  }

  @Put()
  Edit(@Body(new ZodPiPe(editSchema)) body) {
    return this.employeesService.editEmployee(body);
  }

  @Put('reactivate')
  reActivate(@Body(new ZodPiPe(reactivateSchema)) body) {
    return this.employeesService.reactivateEmployee(body);
  }

  @Delete()
  Quit(@Body(new ZodPiPe(quitSchema)) body) {
    return this.employeesService.quitEmployee(body);
  }

  @Put('template')
  updateTemplate(@Body(new ZodPiPe(templateSchema)) body) {
    return this.employeesService.updateTemplate(body);
  }

  @Get('export')
  @Header('Content-Disposition', 'attachment; filename=Inventario.xlsx')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  export() {
    return this.employeesService.export();
  }
}
