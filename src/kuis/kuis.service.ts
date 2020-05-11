import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKategoriKuisDto } from './dto/createKategoriKuis.dto';
import { KategoriKuis } from './entity/kategoriKuis.entity';
import { Guru } from '../user/entities/guru.entity';
import { CreateKuisBulkDto } from './dto/createKuis.dto';
import { Kuis } from './entity/kuis.entity';

@Injectable()
export class KuisService {
  constructor(
    @InjectRepository(KategoriKuis)
    private katKuisRepo: Repository<KategoriKuis>,
    @InjectRepository(Kuis) private kuisRepo: Repository<Kuis>,
  ) {}

  /**
   * get data kategori kuis berdasarkan guru
   * @param Guru
   */
  getAllForGuru(guru: Guru) {
    const options: any = {
      relations: ['guru', 'matpel'],
    };

    if (guru != null) {
      options.where = { guru };
    }

    return this.katKuisRepo.find(options);
  }

  /**
   * get detail kategori kuis
   * @param id
   */
  getOne(id: number) {
    return this.katKuisRepo
      .createQueryBuilder('katkuis')
      .leftJoinAndSelect('katkuis.kuis', 'kuis')
      .leftJoinAndSelect('katkuis.matpel', 'matpel')
      .where({ idKategoriKuis: id })
      .orderBy('kuis.idKuis')
      .getOne();
    //   ({
    //   where: { idKategoriKuis: id },
    //   relations: ['kuis', 'matpel'],
    // });
  }

  /**
   * buat kategori kuis
   * @param guru
   * @param data
   */
  async create(guru: Guru, data: CreateKategoriKuisDto) {
    const katKuis = this.katKuisRepo.create(data);
    katKuis.guru = guru;

    return this.katKuisRepo.save(katKuis);
  }

  /**
   * saveSoal
   */
  async saveSoal(guru: Guru, dto: CreateKuisBulkDto) {
    return this.kuisRepo.save(
      dto.kuis.map((e) => {
        const soal = Object.assign(this.kuisRepo.create(), e);
        soal._guru = guru.nip;

        return soal;
      }),
    );
  }
}
