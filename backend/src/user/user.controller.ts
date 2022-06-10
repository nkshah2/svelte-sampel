import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { STSession } from 'src/auth/supertokens/supertokens.types';
import { AppConfig } from 'src/config/config.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  getMyInformation(@Session() session: STSession) {
    return this.userService.getUserInfo(session.getUserId());
  }
  @Get('/')
  returnDefault() {
    return 'https://docs.devb.io';
  }
}
