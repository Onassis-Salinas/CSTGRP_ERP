import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FunctionsModule } from './functions/functions.module';
import { RecordsModule } from './records/records.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    FunctionsModule,
    RecordsModule,
    FilesModule,
    AuthModule,
  ],
})
export class GeneralModule {}
