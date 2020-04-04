import { Column, Entity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Murid } from './murid.entity';
import { Guru } from './guru.entity';

@Entity()
export class Kelas {
  @Column({ primary: true, length: 3 })
  idKelas: string;

  @Column({ length: 4 })
  namaKelas: string;

  @Column({ length: 35 })
  waliKelas: string;

  @Column({ type: 'text' })
  keterangan: string;

  @OneToMany(
    (type) => Murid,
    (murid) => murid.kelas,
  )
  murid: Murid[];

  @OneToOne(
    (type) => Guru,
    (guru) => guru.kelas,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'waliKelas' })
  guru: Guru;
}
