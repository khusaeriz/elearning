import { Controller, Get, Inject, Post, Body, Query } from '@nestjs/common';
import { GetUser } from '../user/user.decorator';
import { UserDetail } from '../user/user-detail.interface';
import { KonsultasiService } from './konsultasi.service';
import { CreateKonsultasiDto } from './dto/create-konsultasi.dto';
import { ListKonsultasiDto } from './dto/list-konsultasi.dto';

@Controller('konsultasi')
export class KonsultasiController {
  constructor(
    @Inject(KonsultasiService) private konsulService: KonsultasiService,
  ) {}

  @Get()
  index(@GetUser() user: UserDetail, @Query() query: ListKonsultasiDto) {
    return this.konsulService.getByUser(user, query);
  }

  @Post('tanya')
  async create(@GetUser() user: UserDetail, @Body() dto: CreateKonsultasiDto) {
    if (user.hakAkses == 'guru') {
      return { error: true, message: 'invalid user permission' };
    }

    try {
      const konsultasi = await this.konsulService.create(dto, user);

      return { error: false, data: konsultasi };
    } catch (error) {
      return { error: true, message: error };
    }
  }
}
