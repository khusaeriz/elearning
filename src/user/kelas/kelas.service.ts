import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kelas } from '../entities/kelas.entity';
import { Repository, In } from 'typeorm';
import { AddKelasDto } from '../dto/addKelas.dto';
import { UserService } from '../user.service';

@Injectable()
export class KelasService {
  constructor(
    @InjectRepository(Kelas)
    private readonly kelasRepository: Repository<Kelas>,
    @Inject(UserService) private userService: UserService,
  ) {}

  async addKelas(data: AddKelasDto[]) {
    return this.userService.add(
      data,
      this.kelasRepository,
      async (data, qb) => {
        const identifier = data.map((d) => d.idKelas);
        const check = await qb.find({
          where: { idKelas: In(identifier) },
        });

        return data.filter(
          (gr) => check.findIndex((ck) => ck.idKelas === gr.idKelas) === -1,
        );
      },
    );
  }
}
