import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { ComputersService } from './computers.service';
import { ApiTags } from '@nestjs/swagger';
import { ZodPiPe } from 'src/interceptors/validation/validation.pipe';
import { deleteSchema, editSchema, createSchema } from './computers.schema';
import { AuthGuard } from 'src/interceptors/auth/authorization.guard';

@ApiTags('Computers')
@Controller('computers')
@UseGuards(new AuthGuard('it'))
export class ComputersController {
  constructor(private readonly computersService: ComputersService) {}

  @Get()
  get() {
    return this.computersService.findAllComputers();
  }

  @Post()
  register(@Body(new ZodPiPe(createSchema)) body) {
    return this.computersService.createComputer(body);
  }

  @Put()
  edit(@Body(new ZodPiPe(editSchema)) body) {
    return this.computersService.editComputer(body);
  }

  @Delete()
  delete(@Body(new ZodPiPe(deleteSchema)) body) {
    return this.computersService.deleteComputer(body);
  }
}
