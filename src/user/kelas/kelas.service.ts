import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kelas } from '../entities/kelas.entity';
import { Repository, In } from 'typeorm';
import { AddKelasDto } from '../dto/addKelas.dto';

@Injectable()
export class KelasService {
  constructor(
    @InjectRepository(Kelas)
    private readonly kelasRepository: Repository<Kelas>,
  ) {}

  async addKelas(data: AddKelasDto[]) {}
}
