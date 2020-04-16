import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AddKelasBulkDto } from '../dto/add-kelas.dto';
import { KelasService } from './kelas.service';

@Controller('kelas')
export class KelasController {
  constructor(@Inject(KelasService) private kelasSevice: KelasService) {}

  @Get()
  async listKelas() {
    return { error: false, data: await this.kelasSevice.getAll() };
  }

  @Post()
  async addKelas(@Body() dto: AddKelasBulkDto) {
    try {
      const kelas = await this.kelasSevice.addKelas(dto.data);
      return { error: false, data: kelas };
    } catch (error) {
      throw new HttpException(
        { error: false, message: error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
