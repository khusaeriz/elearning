import { Column, Entity, OneToMany } from 'typeorm';
import { Murid } from './murid.entity';

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
}
