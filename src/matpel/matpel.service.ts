import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Matpel } from './entities/matpel.entity';
import { Repository } from 'typeorm';
import { AddMatpelDto } from './dto/addMatpel.dto';

@Injectable()
export class MatpelService {
  constructor(
    @InjectRepository(Matpel) private readonly matpelRepo: Repository<Matpel>,
  ) {}

  getAll() {
    return this.matpelRepo.find();
  }

  async add(data: AddMatpelDto) {
    const newMatpel = this.matpelRepo.create(data);

    return this.matpelRepo.save(newMatpel);
  }

  delete(idMatpel: string) {
    return this.matpelRepo.delete({ idMatpel });
  }
}
