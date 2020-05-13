import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKategoriKuisDto } from './dto/createKategoriKuis.dto';
import { KategoriKuis } from './entity/kategoriKuis.entity';
import { Guru } from '../user/entities/guru.entity';
import { CreateKuisBulkDto } from './dto/createKuis.dto';
import { Kuis } from './entity/kuis.entity';
import { Murid } from '../user/entities/murid.entity';
import { Nilai } from './entity/nilai.entity';
import { KalkulasiNilaiDTO } from './dto/kalkulasiNilai.dto';

@Injectable()
export class KuisService {
  constructor(
    @InjectRepository(KategoriKuis)
    private katKuisRepo: Repository<KategoriKuis>,
    @InjectRepository(Kuis) private kuisRepo: Repository<Kuis>,
    @InjectRepository(Nilai) private nilaiRepo: Repository<Nilai>,
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

  async getAllForMurid(murid: Murid) {
    const kuis = await this.katKuisRepo.find({ relations: ['guru', 'matpel'] });
    const nilais = await this.nilaiRepo.find({ where: { murid } });

    const kuisWithNilai = kuis.map((k) => {
      const nilai = nilais.find((e) => e._katKuis === k.idKategoriKuis) ?? null;
      k.nilai = nilai;

      return k;
    });

    return kuisWithNilai;
  }

  /**
   * kalkulasiNilai
   */
  public async kalkulasiNilai(murid: Murid, dto: KalkulasiNilaiDTO) {
    const kuis = dto.kuis;
    const katKuis = await this.katKuisRepo.findOne(kuis.idKategoriKuis, {
      relations: ['kuis'],
    });

    let nilai = await this.nilaiRepo.findOne({ where: { murid, katKuis } });

    if (nilai != null) {
      throw 'Murid sudah mengerjakan soal.';
    }

    nilai = this.nilaiRepo.create();
    nilai.murid = murid;
    nilai.katKuis = kuis;
    nilai.tanggalUjian = new Date();

    const totalJawabanBenar = katKuis.kuis.reduce((c, e) => {
      const jawabanMurid = kuis.kuis.find((el) => el.idKuis === e.idKuis);

      if (jawabanMurid == null) {
        return c;
      }

      if (e.kunci === jawabanMurid.kunci) {
        return c + 1;
      }

      return c;
    }, 0);

    console.log(totalJawabanBenar);

    nilai.nilai = (totalJawabanBenar / katKuis.kuis.length) * 100;
    await this.nilaiRepo.insert(nilai);

    return nilai;
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
