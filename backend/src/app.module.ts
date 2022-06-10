import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './db/db.module';
import { PrismaService } from './db/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/config.service';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { AuthService } from './auth/auth.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? 'production.env'
          : 'development.env',
      cache: true,
      expandVariables: true,
      validate,
      isGlobal: true,
    }),
    AppConfigModule,
    AuthModule.forRoot({
      // https://supertokens.com/docs/session/appinfo
      // These variables should by now be validated and initialised in config.service.ts
      connectionURI:
        'https://b3f4cf719cd711ec8fcd9dea559bdf0c-eu-west-1.aws.supertokens.io:3574',
      apiKey: 'Gte9Tynd-gY79Ztusg=4oDq9Xr=CYP',
      appInfo: {
        appName: process.env.APP_NAME,
        apiDomain: process.env.API_DOMAIN,
        websiteDomain: process.env.WEB_DOMAIN,
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
    }),
    DatabaseModule,
    UserModule,
    MailModule,
  ],
  controllers: [AppController, AuthController],
  providers: [PrismaService, AuthService],
})
export class AppModule {}
