import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kelas } from '../entities/kelas.entity';
import { Repository, In } from 'typeorm';
import { AddKelasDto } from '../dto/add-kelas.dto';

@Injectable()
export class KelasService {
  constructor(
    @InjectRepository(Kelas)
    private readonly kelasRepository: Repository<Kelas>,
  ) {}

  async getAll() {
    return this.kelasRepository.find({
      relations: ['guru'],
      order: { idKelas: 'DESC' },
    });
  }

  async addKelas(data: AddKelasDto[]) {
    const newKelas: Kelas[] = await Promise.all(
      data.map(async (dt) => {
        const kelas = this.kelasRepository.create(dt);

        if (await this.kelasRepository.findOne({ idKelas: dt.idKelas })) {
          throw Error('ID Kelas sudah digunakan');
        }

        return kelas;
      }),
    );

    return this.kelasRepository.insert(newKelas);
  }
}
