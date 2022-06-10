import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}
  @Get('/')
  displayDefault() {
    return 'https://docs.devb.io';
  }
}
