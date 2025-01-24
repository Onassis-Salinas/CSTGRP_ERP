import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ContextProvider } from 'src/interceptors/context.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ContextProvider],
})
export class UsersModule {}
