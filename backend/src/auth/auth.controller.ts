import { Body, Controller, Post, Res, Session } from '@nestjs/common';
import { UserLoginDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { STSession } from './supertokens/supertokens.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() userLoginDto: UserLoginDto,
    @Res({ passthrough: true }) res,
  ) {
    return this.authService.login(userLoginDto, res);
  }

  @Post('logout')
  async logout(@Session() session: STSession) {
    return this.authService.logout(session);
  }
}
