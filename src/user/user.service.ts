import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Guru } from './entities/guru.entity';
import { Murid } from './entities/murid.entity';
import { Repository, getConnection, In } from 'typeorm';
import { AddGuruDto } from './dto/addGuru.dto';
import { AddMuridDto } from './dto/addMurid.dto';
import { Kelas } from './entities/kelas.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Guru) private readonly guruRepository: Repository<Guru>,
    @InjectRepository(Murid)
    private readonly muridRepository: Repository<Murid>,
    @InjectRepository(Kelas)
    private readonly kelasRepository: Repository<Kelas>,
  ) {}

  async getGuruByUsernameAndPassword(username: string, password: string) {
    const guru = await this.guruRepository.findOne({ username });

    return guru === undefined ? null : guru;
  }

  async add<T, E>(
    data: T[],
    repo: Repository<E>,
    filter: (data: E[], qb: Repository<E>) => Promise<E[]>,
  ) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    const entity = data.map((dt) => repo.create(dt));

    await queryRunner.startTransaction();
    const entityNew = await filter(entity, repo);

    let entitySaved: E[];

    try {
      entitySaved = await queryRunner.manager.save(entityNew);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      queryRunner.release();
    }

    return entitySaved;
  }

  async addGuru(data: AddGuruDto[]) {
    return this.add<AddGuruDto, Guru>(
      data,
      this.guruRepository,
      async (guru, qb) => {
        const uniques = guru.map((gr) => gr.nip);
        const check = await qb.find({
          where: { nip: In(uniques) },
        });

        return guru.filter(
          (gr) => check.findIndex((ck) => ck.nip === gr.nip) === -1,
        );
      },
    );
  }

  async addMurid(data: AddMuridDto[]) {
    return this.add<AddMuridDto, Murid>(
      data,
      this.muridRepository,
      async (murid, qb) => {
        const uniques = murid.map((gr) => gr.nis);
        const check = await qb.find({
          where: { nip: In(uniques) },
        });

        return murid.filter(
          (gr) => check.findIndex((ck) => ck.nis === gr.nis) === -1,
        );
      },
    );
  }
}
