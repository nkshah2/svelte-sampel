import { Global, Module } from '@nestjs/common';
import { SmtpService } from './mail.service';

@Global()
@Module({
  providers: [SmtpService],
  exports: [SmtpService],
})
export class MailModule {}
