import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Konsultasi } from './konsultasi.entity';
import { Repository } from 'typeorm';
import { UserDetail } from '../user/user-detail.interface';
import { CreateKonsultasiDto } from './dto/create-konsultasi.dto';
import { Murid } from '../user/entities/murid.entity';
import { ListKonsultasiDto } from './dto/list-konsultasi.dto';

@Injectable()
export class KonsultasiService {
  constructor(
    @InjectRepository(Konsultasi)
    private konsultasiRepository: Repository<Konsultasi>,
  ) {}

  /**
   * get all konsultasi record by user
   * @param user
   */
  async getByUser(user: UserDetail, query: ListKonsultasiDto) {
    const where = {};
    where[user.hakAkses] = user.detail;

    if ('status' in query) {
      where['status'] = query.status;
    }

    return this.konsultasiRepository.find(where);
  }

  /**
   * create new konsultasi record
   * @param data
   */
  async create(data: CreateKonsultasiDto, user: UserDetail) {
    const konsultasi = this.konsultasiRepository.create(data);
    konsultasi.murid = user.detail as Murid;

    const newKonsultasi = await this.konsultasiRepository.save(konsultasi);
    return newKonsultasi;
  }
}
