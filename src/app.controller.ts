import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { readFileSync } from 'fs';
import { resolve } from 'path';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return readFileSync(
      resolve(__dirname, '..', 'resources', 'index.html'),
      'utf8',
    );
  }
}
