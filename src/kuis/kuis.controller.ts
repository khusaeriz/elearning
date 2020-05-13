import { Controller, Post, Body, Inject, Get, Param } from '@nestjs/common';
import { CreateKategoriKuisDto } from './dto/createKategoriKuis.dto';
import { KuisService } from './kuis.service';
import { GetUser } from '../user/user.decorator';
import { UserDetail } from '../user/user-detail.interface';
import { Guru } from '../user/entities/guru.entity';
import { CreateKuisBulkDto } from './dto/createKuis.dto';
import { Murid } from '../user/entities/murid.entity';
import { KalkulasiNilaiDTO } from './dto/kalkulasiNilai.dto';

@Controller('kuis')
export class KuisController {
  constructor(@Inject(KuisService) private kuisService: KuisService) {}

  @Get()
  async index(@GetUser() user: UserDetail) {
    if (user.hakAkses === 'guru') {
      const detail = user.detail as Guru;

      return {
        error: false,
        data: await this.kuisService.getAllForGuru(detail),
      };
    } else if (user.hakAkses === 'murid') {
      const detail = user.detail as Murid;
      return {
        error: false,
        data: await this.kuisService.getAllForMurid(detail),
      };
    }
  }

  @Get(':id')
  async detail(@Param('id') id: number) {
    return { error: false, data: await this.kuisService.getOne(id) };
  }

  @Post()
  async add(@GetUser() user: UserDetail, @Body() data: CreateKategoriKuisDto) {
    const detail = user.detail as Guru;

    try {
      const kuis = await this.kuisService.create(detail, data);
      return { error: false, data: kuis };
    } catch (error) {
      return { error: true, message: error.toString() };
    }
  }

  @Post('save-soal')
  async saveSoal(@Body() dto: CreateKuisBulkDto, @GetUser() user: UserDetail) {
    try {
      const kuis = await this.kuisService.saveSoal(user.detail as Guru, dto);
      return { error: false, data: kuis };
    } catch (error) {
      return { error: true, message: error.toString() };
    }
  }

  @Post('kalkulasi-nilai')
  async kalkulasiNilai(
    @Body() dto: KalkulasiNilaiDTO,
    @GetUser() user: UserDetail,
  ) {
    try {
      const murid = user.detail as Murid;
      const nilai = await this.kuisService.kalkulasiNilai(murid, dto);

      return { error: false, data: nilai };
    } catch (error) {
      return { error: true, message: error.toString() };
    }
  }
}
