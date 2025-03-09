import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Put,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/interceptors/auth/authorization.guard';
import { ZodPiPe } from 'src/interceptors/validation/validation.pipe';
import {
  createDocSchema,
  createEvaluationSchema,
  createRecordSchema,
  createSchema,
  editDocSchema,
  editSchema,
  getDocumentsSchema,
  getEmployeeHistorySchema,
  getEvaluationsSchema,
  idSchema,
  quitSchema,
  reactivateSchema,
  templateSchema,
} from './employees.schema';
import { FileInterceptor } from '@nest-lab/fastify-multer';
import { File } from '@nest-lab/fastify-multer';

@ApiTags('Employees')
@Controller('employees')
@UseGuards(new AuthGuard('employees'))
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  getActive() {
    return this.employeesService.getActiveEmployees();
  }

  @Get(':id')
  getEmployee(@Param(new ZodPiPe(idSchema)) params) {
    return this.employeesService.getEmployee(params);
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
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() body, @UploadedFile() file: File) {
    const validatedBody = new ZodPiPe(createSchema).transform(
      JSON.parse(body.json),
    );
    return this.employeesService.registerEmployee(validatedBody, file);
  }

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  edit(@Body() body, @UploadedFile() file: File) {
    const validatedBody = new ZodPiPe(editSchema).transform(
      JSON.parse(body.json),
    );
    return this.employeesService.editEmployee(validatedBody, file);
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

  @Get('documents/:employeeId')
  getDocuments(@Param(new ZodPiPe(getDocumentsSchema)) body) {
    return this.employeesService.getDocuments(body);
  }

  @Get('evaluations/:employeeId')
  getEvaluations(@Param(new ZodPiPe(getEvaluationsSchema)) body) {
    return this.employeesService.getEvaluations(body);
  }

  @Get('history/:employeeId')
  getEmployeeHistory(@Param(new ZodPiPe(getEmployeeHistorySchema)) body) {
    return this.employeesService.getEmployeeHistory(body);
  }

  @Post('history')
  uploadRecord(@Body(new ZodPiPe(createRecordSchema)) body) {
    return this.employeesService.uploadRecord(body);
  }

  @Post('documents')
  @UseInterceptors(FileInterceptor('file'))
  uploadDocument(@Body() body, @UploadedFile() file: File) {
    const validatedBody = new ZodPiPe(createDocSchema).transform(
      JSON.parse(body.json),
    );
    return this.employeesService.uploadDocument(validatedBody, file);
  }

  @Post('evaluations')
  @UseInterceptors(FileInterceptor('file'))
  uploadEvaluation(@Body() body, @UploadedFile() file: File) {
    const validatedBody = new ZodPiPe(createEvaluationSchema).transform(
      JSON.parse(body.json),
    );

    return this.employeesService.uploadEvaluation(validatedBody, file);
  }

  @Put('documents')
  @UseInterceptors(FileInterceptor('file'))
  editDocument(@Body() body, @UploadedFile() file: File) {
    const validatedBody = new ZodPiPe(editDocSchema).transform(
      JSON.parse(body.json),
    );
    return this.employeesService.editDocument(validatedBody, file);
  }

  @Delete('documents/:id')
  deleteDocument(@Param(new ZodPiPe(idSchema)) body) {
    return this.employeesService.deleteDocument(body);
  }

  @Delete('evaluations/:id')
  deleteEvaluation(@Param(new ZodPiPe(idSchema)) body) {
    return this.employeesService.deleteEvaluation(body);
  }

  @Get('export')
  export() {
    return this.employeesService.export();
  }

  @Get('export-basic')
  exportBasic() {
    return this.employeesService.exportBasic();
  }
}
