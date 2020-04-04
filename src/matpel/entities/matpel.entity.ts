import { Entity, Column, OneToMany } from 'typeorm';
import { KategoriKuis } from '../../kuis/entity/kategoriKuis.entity';
import { Nilai } from '../../kuis/entity/nilai.entity';

@Entity()
export class Matpel {
  @Column({ primary: true, length: 5 })
  idMatpel: string;

  @Column({ length: 35 })
  namaMatpel: string;

  @Column({ length: 100 })
  keterangan: string;

  @OneToMany(
    (type) => KategoriKuis,
    (katKuis) => katKuis.matpel,
  )
  kategoriKuis: KategoriKuis[];

  @OneToMany(
    (type) => Nilai,
    (katKuis) => katKuis.matpel,
  )
  nilai: Nilai[];
}
