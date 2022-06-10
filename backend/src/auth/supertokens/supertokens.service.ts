import { Inject } from '@nestjs/common';
import SuperTokens from 'supertokens-node';
import ThirdParty from 'supertokens-node/recipe/thirdparty';
import { PrismaService } from '../../db/prisma/prisma.service';
import { AuthModuleConfig, ConfigInjectionToken } from '../config.interface';
import { PermissionsManager } from '../perms/perms.controller';
import { Permissions } from '../perms/perms.types';
import {
  STEmailVerificationHandler,
  STSessionHandler,
} from './supertokens.types';

let { Google, Facebook, Apple } = ThirdParty;

const pm = new PermissionsManager(Permissions);

export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
    private prisma: PrismaService,
  ) {
    SuperTokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI:
          'https://b3f4cf719cd711ec8fcd9dea559bdf0c-eu-west-1.aws.supertokens.io:3574',
        apiKey: 'Gte9Tynd-gY79Ztusg=4oDq9Xr=CYP',
      },
      recipeList: [
        STSessionHandler.init({
          antiCsrf: 'NONE',
          cookieSameSite: 'strict',
        }),
        STEmailVerificationHandler.init({
          getEmailForUserId: async (userId) =>
            (
              await prisma.user.findFirst({
                where: { uid: userId },
                select: { email: true },
              })
            ).email,
        }),
        ThirdParty.init({
          signInAndUpFeature: {
            providers: [
              // ThirdParty.Google({
              //   clientId:
              //     '859215877709-fsot93q47jsm721b0m3utrskftd3tadu.apps.googleusercontent.com',
              //   clientSecret: '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',
              // }),

              ThirdParty.Google({
                clientId: "267245008394-ui3s0bjjl6c28pm2qlqk1mad6un5gf21.apps.googleusercontent.com",
                clientSecret: "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",
                authorisationRedirect: {
                  params: {
                    "redirect_uri": "http://localhost:8080/auth/callback/social/google"
                  }
                }
            }),
            ],
          },
          override: {
            apis: (oI) => {
              return {
                ...oI,
                signInUpPOST: async function (input) {
                  if (oI.signInUpPOST === undefined) {
                    throw Error('Should never come here');
                  }
                  let resp = await oI.signInUpPOST(input);
                  if (resp.status === 'OK') {
                    if (resp.createdNewUser) {
                      let googleAccessToken =
                        resp.authCodeResponse['access_token'];
                      let user = resp.user;
                      let session = resp.session;

                      const hexPerm = pm.createPermissionAttribute(
                        Permissions.CREATE_LINK,
                        Permissions.EDIT_LINK,
                      );

                      const newUser = await this.prisma.user.create({
                        data: {
                          uid: 'TEST',
                          email: user.email.toLowerCase(),
                          username: user.email.toLowerCase(),
                          permissions: hexPerm,
                        },
                      });

                      // TODO: store info about the user in your own db

                      // TODO: You can modify the access token payload like this:
                      await session.updateAccessTokenPayload({
                        perms: newUser.permissions,
                      });
                    }
                  }
                  return resp;
                },
              };
            },
          },
        }),
      ],
    });
  }
}
