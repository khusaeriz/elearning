import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { AddKelasBulkDto } from '../dto/add-kelas.dto';
import { KelasService } from './kelas.service';

@Controller('kelas')
export class KelasController {
  constructor(@Inject(KelasService) private kelasSevice: KelasService) {}

  @Get()
  async listKelas() {
    return [];
  }

  @Post()
  async addKelas(@Body() dto: AddKelasBulkDto) {
    try {
      const kelas = await this.kelasSevice.addKelas(dto.data);
      return { error: false, data: kelas };
    } catch (error) {
      return { error: false, message: error };
    }
  }
}
