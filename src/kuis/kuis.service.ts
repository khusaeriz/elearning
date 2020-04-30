import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKategoriKuisDto } from './dto/createKategoriKuis.dto';
import { KategoriKuis } from './entity/kategoriKuis.entity';
import { Guru } from '../user/entities/guru.entity';

@Injectable()
export class KuisService {
  constructor(
    @InjectRepository(KategoriKuis)
    private katKuisRepo: Repository<KategoriKuis>,
  ) {}

  /**
   * get data kategori kuis berdasarkan guru
   * @param Guru
   */
  getAllForGuru(guru: Guru) {
    let options: any = {
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
    return this.katKuisRepo.findOne({
      where: { idKategoriKuis: id },
      relations: ['kuis'],
    });
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
}
