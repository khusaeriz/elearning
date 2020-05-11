import { Entity, Column, OneToOne } from 'typeorm';
import { Guru } from './guru.entity';
import { Murid } from './murid.entity';

@Entity('users')
export class User {
  @Column({ length: 100, primary: true })
  username: string;

  @Column({ length: 32 })
  password: string;

  @Column({ length: 100 })
  nama: string;

  @Column({ length: 10, name: 'hak_akses' })
  hakAkses: 'murid' | 'guru' | 'admin';

  @OneToOne(
    (type) => Guru,
    (guru) => guru.user,
  )
  guru: Guru;

  @OneToOne(
    (type) => Murid,
    (murid) => murid.user,
  )
  murid: Murid;
}
