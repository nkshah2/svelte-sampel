import { Module } from '@nestjs/common';
import { AppConfig } from 'src/config/config.service';
import { SmtpService } from 'src/mail/mail.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
