import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { AssistanceModule } from './assistance/assistance.module';
import { StatsModule } from './stats/stats.module';
import { VariousModule } from './various/various.module';
import { ProductivityModule } from './productivity/productivity.module';

@Module({
  imports: [
    EmployeesModule,
    AssistanceModule,
    StatsModule,
    VariousModule,
    ProductivityModule,
  ],
})
export class HRModule {}
