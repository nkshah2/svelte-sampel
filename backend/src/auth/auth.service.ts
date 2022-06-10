import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { AccessTokenPayload } from '../auth/perms/perms.types';
import { PrismaService } from '../db/prisma/prisma.service';
import { UserLoginDto } from '../user/user.dto';
import { STSession, STSessionHandler } from './supertokens/supertokens.types';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  //User submits trying to login using their details.
  async login(userLoginDto: UserLoginDto, res: any) {
    const user = await this.prisma.user.findFirst({
      where: { email: userLoginDto.email.toLowerCase() },
      select: {
        uid: true,
        password: true,
        permissions: true,
      },
    });

    if (
      user !== null &&
      (await compare(userLoginDto.password, user.password))
    ) {
      const payload: AccessTokenPayload = {
        perms: user.permissions,
      };
      await STSessionHandler.createNewSession(res, user.uid, payload);
      return user;
    }

    //If they have either entered the details incorrectly or they don't have an account within the DB.
    throw new UnauthorizedException('Invalid Email or Password');
  }

  async logout(session: STSession) {
    await session.revokeSession();
    return;
  }
}
