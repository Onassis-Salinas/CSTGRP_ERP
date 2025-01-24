import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FunctionsModule } from './functions/functions.module';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [UsersModule, FunctionsModule, RecordsModule],
})
export class GeneralModule {}
