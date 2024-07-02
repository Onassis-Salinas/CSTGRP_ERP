import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FunctionsModule } from './functions/functions.module';

@Module({
  imports: [UsersModule, FunctionsModule],
})
export class GeneralModule {}
