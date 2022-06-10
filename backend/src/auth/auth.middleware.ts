import { Injectable, NestMiddleware } from '@nestjs/common';
import { middleware } from 'supertokens-node/framework/express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  supertokenMiddleware: any;

  constructor() {
    this.supertokenMiddleware = middleware();
  }

  use(req: Request, res: any, next: () => void) {
    return this.supertokenMiddleware(req, res, next);
  }
}
