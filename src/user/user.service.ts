import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Guru } from './entities/guru.entity';
import { Murid } from './entities/murid.entity';
import { Repository, getConnection, In } from 'typeorm';
import { AddGuruDto } from './dto/add-guru.dto';
import { AddMuridDto } from './dto/add-murid.dto';
import { Kelas } from './entities/kelas.entity';
import { UserDetail } from './user-detail.interface';

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

  async checkUser(username: string, password: string) {
    const user = (await this.userRepository.findOne({
      username,
      password,
    })) as UserDetail;

    if (user != null) {
      user.password = undefined;
      
      if (user.hakAkses == 'guru') {
        user.detail = await this.guruRepository.findOne(user);
      } else {
        user.detail = await this.muridRepository.findOne(user);
      }

      return user;
    }
  }

  async add<T, E>(
    data: T[],
    repo: Repository<E>,
    filter: (data: E[], qb: Repository<E>) => Promise<E[]>,
    userBuilder: () => User[],
  ) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    const entity = data.map((dt) => repo.create(dt));

    await queryRunner.startTransaction();
    const entityNew = await filter(entity, repo);
    const userNew = userBuilder();

    let entitySaved: E[];
    let userSaved: User[];

    try {
      userSaved = await queryRunner.manager.save(userNew);
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
    return this.add(
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
      () => {
        return data.map((dt) =>
          this.userRepository.create({
            username: dt.username,
            password: dt.password,
            nama: dt.nama,
            hakAkses: 'guru',
          }),
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
      () => {
        return data.map((dt) =>
          this.userRepository.create({
            username: dt.username,
            password: dt.password,
            nama: dt.nama,
            hakAkses: 'murid',
          }),
        );
      },
    );
  }

  async listGuru() {
    return this.guruRepository.find();
  }

  async listMurid() {
    return this.muridRepository.find();
  }
}
