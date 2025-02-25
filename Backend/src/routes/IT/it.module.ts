import { Module } from '@nestjs/common';
import { EmailsModule } from './emails/emails.module';
import { ComputersModule } from './computers/computers.module';
import { DevicesModule } from './devices/devices.module';
import { DirectoryModule } from './directory/directory.module';

@Module({
  imports: [EmailsModule, ComputersModule, DevicesModule, DirectoryModule],
})
export class ITModule { }
