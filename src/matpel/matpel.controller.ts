import { Controller, Get, Inject, Post, Body } from '@nestjs/common';
import { MatpelService } from './matpel.service';
import { AddMatpelDto } from './dto/addMatpel.dto';

@Controller('matpel')
export class MatpelController {
  constructor(@Inject(MatpelService) private matpelService: MatpelService) {}

  @Get()
  async index() {
    return { error: false, data: await this.matpelService.getAll() };
  }

  @Post()
  async add(@Body() data: AddMatpelDto) {
    try {
      const matpel = await this.matpelService.add(data);
      return { error: false, data: matpel };
    } catch (error) {
      return { error: true, message: error.toString() };
    }
  }
}
