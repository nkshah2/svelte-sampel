import { Injectable } from '@nestjs/common';
import { PermissionsManager } from '../auth/perms/perms.controller';
import { Permissions } from '../auth/perms/perms.types';
import { AppConfig } from 'src/config/config.service';
import { PrismaService } from '../db/prisma/prisma.service';
import { EmailTemplates, SmtpService } from '../mail/mail.service';
import { CreateUserDto, CreateUserGoogleDto, UserInfoDto } from './user.dto';
import { hash } from 'bcrypt';
import { STEmailVerificationHandler } from '../auth/supertokens/supertokens.types';
import { v4 as uuidv4 } from 'uuid';

const pm = new PermissionsManager(Permissions);
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly smtpService: SmtpService,
    private readonly appConfig: AppConfig,
  ) {}

  async getUserInfo(uid: string): Promise<any> {
    return await this.prisma.user.findFirst({
      where: {
        uid: uid,
      },
    });
  }

  async sendVerificationEmail(userInfo: Partial<UserInfoDto>) {
    console.log('trying');
    let user: UserInfoDto;
    if (userInfo.uid !== undefined && userInfo.email !== undefined) {
      console.log(userInfo);
      user = { uid: userInfo.uid, email: userInfo.email };
    } else {
      const where =
        userInfo.uid !== undefined
          ? { uid: userInfo.uid }
          : { email: userInfo.email };
      user = await this.prisma.user.findFirst({
        where,
        select: { email: true, uid: true },
      });
    }

    await STEmailVerificationHandler.revokeEmailVerificationTokens(
      user.uid,
      user.email,
    );
    await STEmailVerificationHandler.unverifyEmail(user.uid, user.email);

    const verifyToken =
      await STEmailVerificationHandler.createEmailVerificationToken(
        user.uid,
        user.email,
      );
    if (verifyToken.status === 'OK') {
      const verifyLink =
        this.appConfig.webDomain + `/auth/verify/${verifyToken.token}`;
      try {
        console.log('sending email');
        this.smtpService.sendEmail(
          user.email,
          'Verify your email address',
          EmailTemplates.VERIFY_MEMBER,
          { verifyLink },
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const hexPerm = pm.createPermissionAttribute(
      Permissions.CREATE_LINK,
      Permissions.EDIT_LINK,
    );
    const user = await this.prisma.user.create({
      data: {
        uid: uuidv4(),
        email: createUserDto.email.toLocaleLowerCase(),
        username: createUserDto.username,
        password: await hash(
          createUserDto.password,
          this.appConfig.passwordSaltRounds,
        ),
        permissions: hexPerm,
      },
    });
    await this.sendVerificationEmail(user);
  }

  async createUserGoogle(createUserGoogleDto: CreateUserGoogleDto) {
    const hexPerm = pm.createPermissionAttribute(
      Permissions.CREATE_LINK,
      Permissions.EDIT_LINK,
    );
    await this.prisma.user.create({
      data: {
        uid: uuidv4(),
        email: createUserGoogleDto.email.toLocaleLowerCase(),
        username: createUserGoogleDto.email.toLocaleLowerCase(),
        permissions: hexPerm,
      },
    });
  }
}
