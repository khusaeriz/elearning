import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kuis } from './entity/kuis.entity';
import { CreateKategoriKuisDto } from './dto/createKategoriKuis.dto';

@Injectable()
export class KuisService {
  constructor(@InjectRepository(Kuis) private kuisRepo: Repository<Kuis>) {}

  async create(data: CreateKategoriKuisDto) {

  }
}
