import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get()
  handle() {
    return {
      message: 'OK',
    };
  }
}
