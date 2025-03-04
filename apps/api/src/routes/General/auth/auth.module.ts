import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ContextProvider } from 'src/interceptors/context.provider';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    ContextProvider,
    {
      provide: 'MODULE',
      useValue: 'auth',
    },
  ],
})
export class AuthModule {}
