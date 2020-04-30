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
    const options: any = {
      relations: ['guru', 'murid'],
      where: {},
    };
    options['where'][user.hakAkses] = user.detail;

    if ('status' in query) {
      options['where']['status'] = query.status;
    }

    return this.konsultasiRepository.find(options);
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

  async reply(idKonsultasi: number, reply: string) {
    const konsultasi = await this.konsultasiRepository.findOne(idKonsultasi);
    konsultasi.jawaban = reply;
    konsultasi.status = 'replied'; // sudah di jawab

    this.konsultasiRepository.save(konsultasi);
    return konsultasi;
  }
}
